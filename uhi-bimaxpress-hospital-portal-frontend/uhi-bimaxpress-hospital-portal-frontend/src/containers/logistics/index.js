import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookOrder from "./components/bookOrder";
import TrackOrder from "./components/trackOrder";
import OrderHistory from "./components/orderHistory";
import SideBar from "./components/sideBar";
import Address from "./components/address";

const Logistics = () => {
  const params = useParams();

  console.log("params", params.category);

  return (
    <div className="mx-5 rounded-md  px-5 pt-5 mb-8 ">
      {/* {params.category} {params.messageID} */}
      <div className="flex flex-col gap-4 ">
        <SideBar />
        <div className="rounded bg-black p-4 w-full ">
          {params.category === "bookOrder" ? (
            <BookOrder />
          ) : params.category === "trackOrder" ? (
            <TrackOrder />
          ) : params.category === "address" ? (
            <Address />
          ) : (
            <OrderHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default Logistics;
