import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./TrackOrderModal.module.css";
import styleScroll from "../../../../../scrollbar.module.css";
import react, { useEffect, useState } from "react";
import notification from "../../../../shared/notification";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TrackOrderModal = (props) => {
  const { closeModal, isOpen, currentOrder, userDetails } = props;

  useEffect(() => {}, [userDetails]);

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
        <div className="w-full h-auto border-fontColor rounded-lg flex ">
          <h1 className="text-xl text-white">Track Order</h1>
          <p className="text-white px-2 h-5 pt-0.5 ml-2 text-xs rounded bg-gray-600">
            Shipment Id - {currentOrder?.shiprocketOrderDetails?.shipmentId}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <img src="/empty.svg" className="w-64 mt-10"></img>
          <p className="text-white mt-10 border border-gray-600 rounded-full px-3">
            Tracking data is not available for this Order
          </p>
        </div>

        <div className="flex w-full justify-end  mt-8">
          <button className="px-8 h-10 ml-4 outline-none bg-green-500 text-white text-sm text-primary-dark rounded font-bold">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TrackOrderModal;
