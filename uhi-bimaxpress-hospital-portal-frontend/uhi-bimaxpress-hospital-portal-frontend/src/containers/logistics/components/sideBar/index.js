import { tab } from "@testing-library/user-event/dist/tab";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const SideBar = () => {
  const navigate = useNavigate();

  const params = useParams();

  const tabs = [
    { name: "Book Order", route: "bookOrder", icon: "fa-solid fa-cart-plus" },
    {
      name: "Track Order",
      route: "trackOrder",
      icon: "fa-solid fa-truck-fast",
    },
    {
      name: "Order History",
      route: "orderHistory",
      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      name: "Manage Address",
      route: "address",
      icon: "fa-solid fa-address-book",
    },
  ];

  return (
    <div className="flex flex-row gap-x-2">
      {tabs.map((item) => {
        return (
          <button
            className={` rounded py-1 pl-2  sm:p-2 sm:pl-4 text-white text-left ${
              params.category == item.route
                ? "bg-orange hover:bg-opacity-90"
                : "bg-gray-400 bg-opacity-30 hover:bg-opacity-40"
            }`}
            onClick={() => navigate(`/orders/${item.route}`)}
          >
            <i className={item.icon}></i>
            <span className="mx-2 text-sm font-semibold visible sm:visible ">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SideBar;
