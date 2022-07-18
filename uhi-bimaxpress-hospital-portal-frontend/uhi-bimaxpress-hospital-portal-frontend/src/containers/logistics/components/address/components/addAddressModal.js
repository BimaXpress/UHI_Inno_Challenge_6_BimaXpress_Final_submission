import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./AddAddressModal.module.css";
import styleScroll from "../../../../../scrollbar.module.css";
import Input from "../../../../shared/input/input";

const AddAddressModal = (props) => {
  const { closeModal, isOpen, handleChange, addAddress, submit } = props;

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
          <h1 className="text-xl text-white">Add New Address</h1>

          <div className="grid grid-cols-2 gap-x-4 mt-2 my-3">
            <Input
              value={addAddress.name}
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
              value={addAddress.email}
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
              value={addAddress.phone}
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
              value={addAddress.pickup_location}
              label={
                <>
                  Location Name
                  <span className="ml-1 text-red-500">*</span>
                </>
              }
              handleChange={handleChange}
              type="text"
              name="pickup_location"
              id="price"
              placeHolder="Enter location name"
            />

            <Input
              value={addAddress.pin_code}
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
              value={addAddress.address}
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
              value={addAddress.city}
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
              value={addAddress.state}
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
              value={addAddress.country}
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
        </div>

        <div className="flex w-full justify-end  mt-8">
          <button
            onClick={submit}
            className="px-8 h-10 ml-4 outline-none bg-green-500 text-white text-sm text-primary-dark rounded font-bold"
          >
            Save
          </button>
          {/* <PlanSelectButton
            text="Ok"
            style={{ maxWidth: "180px" }}
            handleClick={closeModal}
          /> */}
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
