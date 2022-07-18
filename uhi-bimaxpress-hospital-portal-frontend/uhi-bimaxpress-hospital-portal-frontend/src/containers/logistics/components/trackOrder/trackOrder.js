import React, { useState, useEffect } from "react";
import getCourierOrders from "../../../../client/logistics/courier";
import TrackOrderModal from "./components/trackOrderModal";

const TrackOrder = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;

  const [courierOrdersList, setCourierOrdersList] = useState();
  const [currentOrder, setCurrentOrder] = useState({});

  const [openTrackOrderModal, setTrackOrderModal] = useState(false);
  const toggleTrackOrderModal = () => {
    setTrackOrderModal((pre) => !pre);
  };

  useEffect(() => {
    if (userDetails?.data) {
      getCourierOrders(
        userDetails?.data,
        setSharedLoaderActivity,
        setCourierOrdersList,
        "orderBooked"
      );
    }
  }, [userDetails]);

  return (
    <>
      <div className="flex flex-col">
        {courierOrdersList ? (
          <div className=" flex flex-col   space-6">
            <div className="text-white flex flex-col ">
              {courierOrdersList.map((data) => {
                return data.isCase ? (
                  <div className="bg-baseColor p-5 rounded   mt-4">
                    <div className="flex justify-between">
                      <div className="">
                        <div className="">
                          {data.cases
                            .map(function (elem, index) {
                              return `File -${index + 1}  ${elem.name}`;
                            })
                            .join(" | ")}
                        </div>
                        <p className="mt-1 text-gray-400">
                          Shipment Id - {"  "}
                          <span className="text-white">
                            {data?.shiprocketOrderDetails?.shipmentId}
                          </span>
                        </p>
                      </div>

                      <div className="text-white bg-orange h-8 py-1 px-2 rounded">
                        Files - {data?.cases.length}
                      </div>
                    </div>
                    <div className="text-white flex flex-row  mt-4">
                      <div className=" w-4/5 flex flex-col  rounded-md mt-2 ">
                        <p className=" bg-opacity-60 text-white">
                          Payment Id - {data?.razorPayPaymentId}
                        </p>
                        <p className="text-sm text-gray-400 mt-2y ">
                          Delivery Address
                        </p>
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
                      <div className="w-1/5 flex justify-end h-6 rounded-md">
                        <p className="bg-gray-500 bg-opacity-60 px-4 text-white">
                          AWB No. - {data?.shiprocketOrderDetails?.awbCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          toggleTrackOrderModal();
                          setCurrentOrder(data);
                        }}
                        className="px-4 py-2 ml-4 outline-none bg-green-500 text-white text-sm  rounded"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="">
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
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col  rounded-md w-full  mt-2 ">
                          <p className=" bg-opacity-60 text-white">
                            Payment Id - {data?.razorPayPaymentId}
                          </p>
                          <p className="text-sm text-gray-400 mt-4 ">
                            Delivery Address
                          </p>
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
                        <div className="w-1/5 flex flex-col justify-end h-6 rounded-md">
                          <p className="bg-gray-500 bg-opacity-60 px-3 text-white">
                            AWB No. - {data?.shiprocketOrderDetails?.awbCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            toggleTrackOrderModal();
                            setCurrentOrder(data);
                          }}
                          className="px-4 py-2  ml-4 outline-none bg-green-500 text-white text-sm  rounded"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <TrackOrderModal
        closeModal={toggleTrackOrderModal}
        isOpen={openTrackOrderModal}
        currentOrder={currentOrder}
        setSharedLoaderActivity={setSharedLoaderActivity}
      />
    </>
  );
};

export default TrackOrder;
