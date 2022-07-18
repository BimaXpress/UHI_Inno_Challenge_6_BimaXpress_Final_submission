import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../shared/footer";

const orderDetails = (props) => {



  return (
    <>
      <div className="bg-primary h-full mx-5 rounded-md my-5">
        <div className="flex flex-col">
          <div className="text-white flex flex-col justify-center items-center mt-10 p-20">
            <p className="text-4xl font-bold">Order Details</p>            
          </div>
        </div>
        <div className="mt-7">
        </div>
      </div>
    </>
  );
};

export default orderDetails;
