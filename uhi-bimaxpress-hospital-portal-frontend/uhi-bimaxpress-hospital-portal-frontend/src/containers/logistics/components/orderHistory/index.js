import React from "react";

const OrderHistory = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-10">
        <img src="/empty.svg" className="w-64 mt-10"></img>
        <p className="text-white mt-10 border border-gray-600 rounded-full px-3">
          No Orders Found
        </p>
      </div>
    </>
  );
};

export default OrderHistory;
