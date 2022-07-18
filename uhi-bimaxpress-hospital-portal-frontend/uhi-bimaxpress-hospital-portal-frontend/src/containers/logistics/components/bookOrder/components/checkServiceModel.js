import React, { useState } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./CheckServiceModel.module.css";
import styleScroll from "../../../../../scrollbar.module.css";
import Input from "../../../../shared/input/input";
import notification from "../../../../shared/notification";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CheckServiceModel = (props) => {
  const {
    closeModal,
    isOpen,
    currentOrder,
    setSharedLoaderActivity,
    userDetails,
  } = props;

  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  const [postData, setPostData] = useState({
    height: "",
    breadth: "",
    length: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const bookOrderFunction = async () => {
    if (checkFormFeild()) {
      setSharedLoaderActivity(true);
      try {
        const checkServiceData = await axios.get(
          `${process.env.REACT_APP_LOGISTICS_API}/logistic/checkingServiceAvailability?height=${postData?.height}&breadth=${postData?.breadth}&length=${postData?.length}&weight=${postData?.weight}&cod=0&delivery_postcode=${currentOrder?.deliveryDetails?.pin_code}&pickup_postcode=${currentOrder?.pickupDetails?.pin_code}&hospitalId=${currentOrder?.hospitalId}`
        );

        console.log(
          "checkService Data",
          checkServiceData.data.data.available_courier_companies
        );
        setCompanyList(checkServiceData.data.data.available_courier_companies);

        // notification("success", "Address successfully added");
        setSharedLoaderActivity(false);
      } catch (error) {
        //
        //@ts-ignore
        setSharedLoaderActivity(false);
        const { response } = error;
        const { request, ...errorObject } = response;
        console.log("", response);

        // console.log("error creating order..........", error);
        notification("error", errorObject.data.error.message);
      }
    }
  };

  const checkFormFeild = () => {
    if (postData?.height < 1) {
      notification("error", "Height are required");
      return false;
    }

    if (postData?.breadth < 1) {
      notification("error", "Breadth are required");
      return false;
    }

    if (postData?.length < 1) {
      notification("error", "Length are required");
      return false;
    }

    if (postData?.weight < 0.1) {
      notification("error", "weight are required");
      return false;
    }

    return true;
  };

  const finalBookOrder = async (currentOrder, currentCompanyDetails) => {
    setSharedLoaderActivity(true);
    try {
      const createOrderBody = {
        hospitalId: currentOrder.hospitalId,
        customerName: userDetails.data.name,
        customerEmail: userDetails.data.email,
        contactNumber: userDetails.data.contactNumber.number,
        razorPayCustomerId: userDetails.data.razorPayCustomerId,
        courierOrderId: currentOrder?._id,
        length: postData?.length,
        breadth: postData?.breadth,
        height: postData?.height,
        weight: postData?.weight,
        shippingCharges: currentCompanyDetails?.rate,
        subTotal: currentCompanyDetails?.rate,
        courierCompanyId: currentCompanyDetails?.courier_company_id,
        courierCompanyName: currentCompanyDetails?.courier_name,
      };

      const createOrderData = await axios.post(
        `${process.env.REACT_APP_LOGISTICS_API}/logistic/createOrder`,
        createOrderBody
      );

      console.log("createOrderBody ......", createOrderBody);
      console.log("checkService Data", createOrderData.data);

      setSharedLoaderActivity(false);
      notification("success", "Order successfully created");
      navigate(`/orders/trackOrder`);
      closeModal();
    } catch (error) {
      //
      //@ts-ignore
      setSharedLoaderActivity(false);
      const { response } = error;
      const { request, ...errorObject } = response;

      // console.log("error creating order..........", error);
      notification("error", errorObject.data.error.message);
    }
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
          <h1 className="text-xl text-white">Service availablility</h1>
        </div>

        <div className="w-full grid grid-cols-5 gap-x-3">
          <Input
            value={postData?.height}
            label={
              <>
                Height (In cm)
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChange}
            type="number"
            name="height"
            placeHolder="Enter height"
          />

          <Input
            value={postData?.breadth}
            label={
              <>
                Breadth (In cm)
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChange}
            type="number"
            name="breadth"
            placeHolder="Enter breadth"
          />

          <Input
            value={postData?.length}
            label={
              <>
                Length (In cm)
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChange}
            type="number"
            name="length"
            placeHolder="Enter Length"
          />

          <Input
            value={postData?.weight}
            label={
              <>
                Weight (In kg)
                <span className="ml-1 text-red-500">*</span>
              </>
            }
            handleChange={handleChange}
            type="text"
            name="weight"
            placeHolder="Enter weight"
          />

          <div className="flex items-end mb-4">
            <button
              onClick={bookOrderFunction}
              className="px-8 h-10 ml-4  outline-none bg-green-500 text-white text-sm text-primary-dark rounded font-bold"
            >
              Check
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          {companyList &&
            companyList.map((data) => {
              return (
                <div className="flex flex-row p-5 bg-black rounded-md">
                  <div className=" flex flex-row justify-between w-full">
                    <div className="flex flex-row text-white font-fold">
                      <div className="w-16 h-16 bg-orange rounded-full text-white flex justify-center items-center">
                        <p className="font-bold text-xl">
                          {data?.delivery_performance}
                        </p>
                      </div>
                      <div className="flex flex-col ml-5">
                        <p className="font-bold text-white text-lg">
                          {data?.courier_name}
                        </p>
                        <div className="flex flex-row">
                          <div className="">
                            <p className="text-xs text-gray-400 mt-2">
                              Estimated Delivery Date
                            </p>
                            <p>{data?.etd}</p>
                          </div>
                          <div className="ml-16">
                            <p className="text-xs text-gray-400 mt-2">Price</p>
                            <p className="text-xs text-white py-1 px-2 bg-green-600 rounded font-bold mt-2">
                              ₹{data?.rate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          finalBookOrder(currentOrder, data);
                        }}
                        className="px-4 py-2 ml-4 text-xs  outline-none bg-blue-600 text-white  rounded"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* <div className="flex w-full justify-end  mt-8">
          <button className="px-8 h-10 ml-4 outline-none bg-green-500 text-white text-sm text-primary-dark rounded font-bold">
            Save
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default CheckServiceModel;
