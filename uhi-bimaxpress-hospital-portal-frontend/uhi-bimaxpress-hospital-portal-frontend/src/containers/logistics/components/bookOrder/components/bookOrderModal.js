import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./BookOrderModal.module.css";
import styleScroll from "../../../../../scrollbar.module.css";
import Input from "../../../../shared/input/input";
import react, { useEffect, useState } from "react";
import getPickUpAddress from "../../../../../client/logistics/address";
import AddressModal from "../components/addressModel";
import notification from "../../../../shared/notification";
import axios from "axios";
import getCourierOrders from "../../../../../client/logistics/courier";
import { useNavigate, useParams } from "react-router-dom";

const BookOrderModal = (props) => {
  const {
    closeModal,
    isOpen,
    selectedItems,
    setSharedLoaderActivity,
    userDetails,
    isCase,
    setCourierOrdersList,
  } = props;

  const navigate = useNavigate();
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    country: "",
    state: "",
    pin_code: "",
  });

  const [productDetails, setProductDetails] = useState({
    name: "",
    productType: "",
    price: "",
    quantity: "",
  });

  const toggleAddressModal = () => {
    setOpenAddressModal((pre) => !pre);
  };

  const [addressList, setAddressList] = useState([]);
  const [pickupAddress, setPickupAddress] = useState([]);

  useEffect(() => {
    getPickUpAddress(
      userDetails?.data,
      setSharedLoaderActivity,
      setAddressList,
      setPickupAddress
    );
  }, [userDetails]);

  useEffect(() => {
    setPickupAddress(addressList[0]);
  }, [addressList]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDeliveryAddress((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const productHandleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const bookOrderNow = async () => {
    if (isCase) {
      const bookOrderPost = {
        hospitalId: userDetails?.data._id,
        pickupDetails: pickupAddress,
        isCase: true,
        insuranceCompany: selectedItems[0].companyName,
        cases: selectedItems,
      };

      setSharedLoaderActivity(true);
      try {
        const newBookOrderData = await axios.post(
          `${process.env.REACT_APP_LOGISTICS_API}/logistic/casesForShipment`,
          bookOrderPost
        );

        console.log("new order data  ...", newBookOrderData);

        notification("success", "Order successfully initiated");
        closeModal();
        navigate(`/orders/bookOrder`);
        setSharedLoaderActivity(false);
      } catch (error) {
        //
        //@ts-ignore
        setSharedLoaderActivity(false);
        const { response } = error;
        const { request, ...errorObject } = response;

        // console.log("error creating order..........", error);
        notification("error", errorObject.data.error.message);
      }
    } else {
      if (checkFormFeild()) {
        setSharedLoaderActivity(true);
        try {
          const checkServiceData = await axios.get(
            `${process.env.REACT_APP_LOGISTICS_API}/logistic/checkingServiceAvailability?weight=1&cod=0&delivery_postcode=${deliveryAddress?.pin_code}&pickup_postcode=${pickupAddress?.pin_code}&hospitalId=${userDetails?.data._id}`
          );

          const newBookOrderData = await axios.post(
            `${process.env.REACT_APP_LOGISTICS_API}/logistic/casesForShipment`,
            {
              hospitalId: userDetails.data._id,
              pickupDetails: pickupAddress,
              isCase: false,
              productDetails: productDetails,
              deliveryDetails: deliveryAddress,
            }
          );

          console.log("new order data  ...", newBookOrderData);

          notification("success", "Order successfully initiated");
          closeModal();
          setSharedLoaderActivity(false);
          getCourierOrders(
            userDetails?.data,
            setSharedLoaderActivity,
            setCourierOrdersList,
            "bookingIntiated"
          );
        } catch (error) {
          //
          //@ts-ignore
          setSharedLoaderActivity(false);
          const { response } = error;
          const { request, ...errorObject } = response;

          // console.log("error creating order..........", error);
          notification("error", errorObject.data.error.message);
        }
      }
    }
  };

  const checkFormFeild = () => {
    if (productDetails?.name.length < 4) {
      notification("error", "Product Name must be at least 4 characters.");
      return false;
    }

    if (productDetails?.productType.length < 4) {
      notification(
        "error",
        "Product material type must be at least 4 characters."
      );
      return false;
    }

    if (productDetails?.quantity < 1) {
      notification("error", "Please enter product quantity");
      return false;
    }

    if (productDetails?.price < 1) {
      notification("error", "Product price must be positive value ");
      return false;
    }

    if (deliveryAddress?.name.length < 4) {
      notification("error", "Name must be at least 4 characters.");
      return false;
    }

    if (
      !String(deliveryAddress?.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      notification("error", "Please insert a valid email address.");
      return false;
    }

    if (deliveryAddress?.phone.length !== 10) {
      notification("error", "Please enter a valid phone number.");
      return false;
    }

    if (
      !String(deliveryAddress?.address).match(/(\d+\s*(?:[A-Z](?![A-Z]))?)/) ||
      deliveryAddress?.address.length < 15
    ) {
      notification(
        "error",
        "Address must be at least 15 characters and 1 numeric character"
      );
      return false;
    }

    if (deliveryAddress?.pin_code.length !== 6) {
      notification("error", "Please enter a valid pin code.");
      return false;
    }

    if (deliveryAddress?.city.length < 3) {
      notification("error", "City name must be at least 3 characters.");
      return false;
    }

    if (deliveryAddress?.state.length < 3) {
      notification("error", "State name must be at least 3 characters.");
      return false;
    }

    if (deliveryAddress?.country.length < 4) {
      notification("error", "Country name must be at least 4 characters.");
      return false;
    }

    return true;
  };

  return (
    <Modal
      isOpen={isOpen}
      className={styles.walletModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={`px-5 py-5 relative bg-baseColor rounded-md max-h-[500px] overflow-y-auto ${styleScroll.customScroll}`}
      >
        <IoClose
          className="absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer"
          onClick={closeModal}
        />
        <div className="w-full h-auto border-fontColor rounded-lg ">
          <h1 className="text-xl text-white">Book new Order</h1>

          {isCase ? (
            <div className="flex flex-col mt-4">
              {/* case files details */}
              <p className="text-sm  text-gray-400 ">Case Files</p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {selectedItems.map((obj) => {
                  return (
                    <div className="text-white bg-black p-3 rounded-md w-auto">
                      <p className="font-semibold">{obj.name}</p>
                      <p className="text-gray-300">{obj.phone}</p>
                      <p className="text-gray-300 mt-2 text-xs">Claim Number</p>
                      <p className="text-orange font-bold mt-1  rounded">
                        {obj.claimNumber}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="">
                <p className="text-white">Product Details</p>
                <div className="grid grid-cols-2 gap-x-4 mt-2 my-3">
                  <Input
                    value={productDetails.name}
                    label={
                      <>
                        Product Name
                        <span className="ml-1 text-red-500">*</span>
                      </>
                    }
                    handleChange={productHandleChange}
                    type="text"
                    name="name"
                    placeHolder="Enter product name"
                  />

                  <Input
                    value={productDetails.type}
                    label={
                      <>
                        Product Material Type
                        <span className="ml-1 text-red-500">*</span>
                      </>
                    }
                    handleChange={productHandleChange}
                    type="text"
                    name="productType"
                    placeHolder="Enter material type"
                  />

                  <Input
                    value={productDetails.quantity}
                    label={
                      <>
                        Product Quantity
                        <span className="ml-1 text-red-500">*</span>
                      </>
                    }
                    handleChange={productHandleChange}
                    type="number"
                    name="quantity"
                    placeHolder="Enter product quantity"
                  />

                  <Input
                    value={productDetails.price}
                    label={
                      <>
                        Product Price
                        <span className="ml-1 text-red-500">*</span>
                      </>
                    }
                    handleChange={productHandleChange}
                    type="number"
                    name="price"
                    placeHolder="Enter price"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* Pickup location details */}
        <div className="flex justify-between">
          <p className="text-sm text-gray-400 mt-4">Pickup Address</p>
          <button
            className="text-sm  mt-4 text-green-500"
            onClick={toggleAddressModal}
          >
            Change Pickup address
          </button>
        </div>

        {addressList.length > 0 ? (
          <div className="flex flex-col bg-black rounded-md w-full p-3 mt-3 ">
            <div className=" flex">
              <p className="text-white font-bold">{pickupAddress?.name}</p>
              <p className="text-white ml-3 px-2 py-1 rounded text-xs bg-orange">
                {pickupAddress?.pickupName}
              </p>
            </div>
            <p className="text-white">{pickupAddress?.email}</p>
            <p className="text-white">+91{pickupAddress?.phone}</p>
            <p className="text-gray-400">{`${pickupAddress?.address} 
                  ${pickupAddress?.city} ${pickupAddress?.state} ${pickupAddress?.country} ${pickupAddress?.pin_code}`}</p>
          </div>
        ) : (
          <div></div>
        )}

        {/* Delivery address add */}

        {isCase ? (
          <> </>
        ) : (
          <>
            <p className="text-sm text-gray-400 mt-4">Delivery Address</p>
            <div className="grid grid-cols-2 gap-x-4 mt-2 my-3">
              <Input
                value={deliveryAddress.name}
                label={
                  <>
                    Name
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="name"
                placeHolder="Enter name"
              />
              <Input
                value={deliveryAddress.email}
                label={
                  <>
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="email"
                placeHolder="Enter email address"
              />

              <Input
                value={deliveryAddress.phone}
                label={
                  <>
                    Phone Number
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="number"
                maxLength="10"
                name="phone"
                placeHolder="Enter phone number"
              />

              <Input
                value={deliveryAddress.pin_code}
                label={
                  <>
                    Pin Code
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="number"
                maxLength="6"
                name="pin_code"
                placeHolder="Enter pin code"
              />

              <Input
                value={deliveryAddress.address}
                label={
                  <>
                    Address
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="address"
                placeHolder="Enter Address"
              />

              <Input
                value={deliveryAddress.city}
                label={
                  <>
                    City
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="city"
                id="price"
                placeHolder="Enter city name"
              />

              <Input
                value={deliveryAddress.state}
                label={
                  <>
                    State
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="state"
                placeHolder="Enter state name"
              />

              <Input
                value={deliveryAddress.country}
                label={
                  <>
                    Country
                    <span className="ml-1 text-red-500">*</span>
                  </>
                }
                handleChange={handleChange}
                type="text"
                name="country"
                placeHolder="Enter country name"
              />
            </div>
          </>
        )}

        <div className="flex w-full justify-end  mt-8">
          <button
            onClick={bookOrderNow}
            className="px-8 h-10 ml-4 outline-none bg-green-500 text-white text-sm text-primary-dark rounded font-bold"
          >
            Save
          </button>
        </div>
        <AddressModal
          openAddressModal={openAddressModal}
          toggleAddressModal={toggleAddressModal}
          addressList={addressList}
          setPickupAddress={setPickupAddress}
        ></AddressModal>
      </div>
    </Modal>
  );
};

export default BookOrderModal;
