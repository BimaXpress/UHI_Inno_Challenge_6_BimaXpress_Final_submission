import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styles from "./documentModal.module.css";
import SharedButton from "../../../shared/button";
import fileDownload from "js-file-download";
import axios from "axios";
import notification from "../../../shared/notification";

const DocumentModal = (props) => {
  const {
    opendocumentModal,
    toggleOpenDocumentModal,
    newApplicationDetails,
    setSharedLoaderActivity,
  } = props;

  const handleDownload = async (url, filename) => {
    setSharedLoaderActivity(true);
    await axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
        setSharedLoaderActivity(false);
      });
  };

  return (
    <Modal
      isOpen={opendocumentModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenDocumentModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full min-h-[400px] overflow-y-hidden rounded px-6 py-4 bg-baseColor lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <div className="flex justify-between items-center  w-full">
          {" "}
          <p className="text-white font-semibold text-2xl">Documents</p>
          <IoClose
            className=" text-2xl text-white bg-red-600 p-1 rounded-full  cursor-pointer"
            onClick={toggleOpenDocumentModal}
          />
        </div>
        <div className="text-center text-white">No Documents</div>
        {/* <div className='m-2 mb-4'>
          <p className='text text-white mb-2'>
            PAN :
            <span className='text-gray-300 ml-2'>
              {newApplicationDetails?.pan?.number}
            </span>
          </p>
          <SharedButton
            text='View PAN Card'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.pan?.url)
          //     handleDownload(
          //       newApplicationDetails?.pan?.url,
          //       `${
          //         newApplicationDetails?.applicantDetails.email
          //       }-panCard.${newApplicationDetails?.pan?.url
          //         .split('.')
          //         .slice(-1)}`
          //     );
          //   else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />
        </div>

        <div className='m-2 mb-4'>
          <p className='text text-white mb-2'>
            Aadhar :
            <span className='text-gray-300 ml-2'>
              {newApplicationDetails?.aadhar?.number}
            </span>
          </p>
          <SharedButton
            text='View Aadhar Card Front'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.aadhar?.frontUrl) {
          //     handleDownload(
          //       newApplicationDetails?.aadhar?.frontUrl,
          //       `${
          //         newApplicationDetails?.applicantDetails.email
          //       }-aadharFront.${newApplicationDetails?.aadhar?.frontUrl
          //         .split('.')
          //         .slice(-1)}`
          //     );
          //   } else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />

          <SharedButton
            text='View Aadhar Card Back'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.aadhar?.backUrl) {
          //     handleDownload(
          //       newApplicationDetails?.aadhar?.backUrl,
          //       `${
          //         newApplicationDetails?.applicantDetails.email
          //       }-aadharBack.${newApplicationDetails?.aadhar?.backUrl
          //         .split('.')
          //         .slice(-1)}`
          //     );
          //   } else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />
        </div>

        <div className='m-2 mb-4'>
          <p className='text text-white mb-2'>Hospital Invoice : </p>
          <SharedButton
            text='Hospital Invoice'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.documents[0]?.urls.length)
          //     newApplicationDetails?.documents[0]?.urls.map((url, index) =>
          //       handleDownload(
          //         url,
          //         `${
          //           newApplicationDetails?.applicantDetails.email
          //         }-hospitalInvoice-${index}.${url.split('.').slice(-1)}`
          //       )
          //     );
          //   else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />
        </div>

        <div className='m-2 mb-4'>
          <p className='text text-white mb-2'>Last 3 Month Bank Statement : </p>
          <SharedButton
            text='View Last 3 Month Bank Statement'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.documents[1]?.urls.length) {
          //     newApplicationDetails?.documents[1]?.urls.map((url, index) =>
          //       handleDownload(
          //         url,
          //         `${
          //           newApplicationDetails?.applicantDetails.email
          //         }-bankStatement-${index}.${url.split('.').slice(-1)}`
          //       )
          //     );
          //   } else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />
        </div>

        <div className='m-2 mb-4'>
          <p className='text text-white mb-2'>Last 3 Month Salary Slip : </p>
          <SharedButton
            text='View Last 3 Month Salary Slip'
            style='bg-secondary text-white text-sm mr-2'
          // handleClick={() => {
          //   if (newApplicationDetails?.documents[2]?.urls.length) {
          //     newApplicationDetails?.documents[2]?.urls.map((url, index) =>
          //       handleDownload(
          //         url,
          //         `${
          //           newApplicationDetails?.applicantDetails.email
          //         }-salarySlip-${index}.${url.split('.').slice(-1)}`
          //       )
          //     );
          //   } else {
          //     notification('warning', 'No Documents');
          //   }
          // }}
          />
        </div> */}
      </div>
    </Modal>
  );
};

export default DocumentModal;
