import React, { useState, useEffect } from "react";
import getCourierOrders from "../../../../client/logistics/courier";
import CheckServiceModel from "./components/checkServiceModel";
import BookOrderModal from "./components/bookOrderModal";

const BookOrder = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;

  const [courierOrdersList, setCourierOrdersList] = useState();
  const [currentOrder, setCurrentOrder] = useState({});

  const [openCheckServiceModal, setOpenCheckServiceModal] = useState(false);
  const toggleCheckServiceModal = () => {
    setOpenCheckServiceModal((pre) => !pre);
  };

  const [openBookOrderModal, setOpenBookOrderModal] = useState(false);
  const toggleBookOrderModal = () => {
    setOpenBookOrderModal((pre) => !pre);
  };

  useEffect(() => {
    if (userDetails?.data) {
      getCourierOrders(
        userDetails?.data,
        setSharedLoaderActivity,
        setCourierOrdersList,
        "bookingIntiated"
      );
    }
  }, [userDetails]);

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div className="text-white font-bold text-lg">Orders</div>
          <div className="text-white font-bold text-lg">
            <button
              onClick={toggleBookOrderModal}
              className="px-4 py-2 ml-4 outline-none bg-green-500 text-white text-sm  rounded"
            >
              Create New Order
            </button>
          </div>
        </div>
        {courierOrdersList && courierOrdersList.length !== 0 ? (
          <div className=" flex flex-col space-y-5">
            <div className="text-white">
              {courierOrdersList.map((data) => {
                return data.isCase ? (
                  <div className="bg-baseColor p-5 rounded   mt-4">
                    <div className="flex justify-between">
                      <div className="">
                        {data.cases
                          .map(function (elem, index) {
                            return `File -${index + 1}  ${elem.name}`;
                          })
                          .join(" | ")}
                      </div>
                      <div className="text-white bg-orange py-1 px-2 rounded">
                        Files - {data?.cases.length}
                      </div>
                    </div>
                    <div className="flex flex-col  rounded-md w-full p-3 mt-4 ">
                      <p className="text-sm text-gray-400 ">Delivery Address</p>
                      <div className=" flex mt-3">
                        <p className="text-white font-bold">
                          {data?.deliveryDetails.name}
                        </p>
                      </div>
                      <p className="text-white">
                        {data?.deliveryDetails?.email}
                      </p>
                      <p className="text-white">
                        +91{data?.deliveryDetails.phone}
                      </p>
                      <p className="text-gray-400">{`${data?.deliveryDetails.address} 
                        ${data?.deliveryDetails.city} ${data?.deliveryDetails.state} ${data?.deliveryDetails.country} ${data?.deliveryDetails.pin_code}`}</p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          toggleCheckServiceModal();
                          setCurrentOrder(data);
                        }}
                        className="px-8 py-2 ml-4 outline-none bg-green-500 text-white text-sm  rounded"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-baseColor p-5 rounded   mt-4">
                    <div className="flex justify-between">
                      <div className="">
                        <div className="">{data?.productDetails?.name}</div>
                        <div className="">
                          {data?.productDetails?.productType}
                        </div>
                        <div>
                          Product Quantity - {data?.productDetails?.quantity}
                        </div>
                      </div>
                      <div className="text-white bg-orange h-8 py-1 px-2 rounded">
                        Price - {data?.productDetails?.price}
                      </div>
                    </div>
                    <div className="flex flex-col  rounded-md w-full p-3 mt-4 ">
                      <p className="text-sm text-gray-400 ">Delivery Address</p>
                      <div className=" flex mt-3">
                        <p className="text-white font-bold">
                          {data?.deliveryDetails.name}
                        </p>
                      </div>
                      <p className="text-white">
                        {data?.deliveryDetails?.email}
                      </p>
                      <p className="text-white">
                        +91{data?.deliveryDetails.phone}
                      </p>
                      <p className="text-gray-400">{`${data?.deliveryDetails.address} 
                        ${data?.deliveryDetails.city} ${data?.deliveryDetails.state} ${data?.deliveryDetails.country} ${data?.deliveryDetails.pin_code}`}</p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          toggleCheckServiceModal();
                          setCurrentOrder(data);
                        }}
                        className="px-8 py-2 ml-4 outline-none bg-green-500 text-white text-sm  rounded"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center w-full p-10">
              <img src="/empty.svg" className="w-64 mt-10"></img>
              <p className="text-white mt-10 border border-gray-600 rounded-full px-3">
                No Orders Found
              </p>
            </div>
          </>
        )}
      </div>

      {toggleBookOrderModal && (
        <BookOrderModal
          isCase={false}
          closeModal={toggleBookOrderModal}
          isOpen={openBookOrderModal}
          setCourierOrdersList={setCourierOrdersList}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
        />
      )}

      <CheckServiceModel
        closeModal={toggleCheckServiceModal}
        isOpen={openCheckServiceModal}
        currentOrder={currentOrder}
        setSharedLoaderActivity={setSharedLoaderActivity}
        userDetails={userDetails}
      />
    </>
  );
};

export default BookOrder;
