import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./BookOrderModal.module.css";
import styleScroll from "../../../../../scrollbar.module.css";
import Input from "../../../../shared/input/input";
import react, { useEffect, useState } from "react";

const AddressModal = (props) => {
  const {
    openAddressModal,
    toggleAddressModal,
    addressList,
    setPickupAddress,
  } = props;
  return (
    <Modal
      isOpen={openAddressModal}
      className={styles.walletModalContainer}
      overlayClassName={styles.overlayContainer}
      onRequestClose={toggleAddressModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={`px-5 py-5 relative bg-baseColor rounded-md max-h-[500px] overflow-y-auto ${styleScroll.customScroll}`}
      >
        <IoClose
          className="absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer"
          onClick={toggleAddressModal}
        />
        <div className="w-full h-auto border-fontColor rounded-lg ">
          <h1 className="text-xl text-white">Pickup Locations</h1>
          <div className="flex flex-col space-y-4">
            {addressList &&
              addressList.map((address) => {
                return (
                  <div
                    onClick={() => {
                      setPickupAddress(address);
                      toggleAddressModal();
                    }}
                    className="flex flex-col bg-black rounded-md w-full p-3  cursor-pointer hover:bg-opacity-30 hover:bg-gray-600"
                  >
                    <div className=" flex">
                      <p className="text-white font-bold">{address.name}</p>
                      <p className="text-white ml-3 px-2 py-1 rounded text-xs bg-orange">
                        {address.pickupName}
                      </p>
                    </div>
                    <p className="text-white">{address.email}</p>
                    <p className="text-white">+91{address.phone}</p>
                    <p className="text-gray-200">{`${address.address} 
                  ${address.city} ${address.state} ${address.country} ${address.pin_code}`}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
