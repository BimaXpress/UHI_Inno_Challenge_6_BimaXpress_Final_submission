import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './rateListModal.module.css';
import SharedButton from '../../../shared/button';
import notification from '../../../shared/notification';
import axios from 'axios';

const RateListModal = (props) => {
  const {
    openRatelistModal,
    toggleOpenRatelistModal,
    companyDetails,
    userDetails,
  } = props;

  const [rateListDetails, setRateListDetails] = useState();

  const filterEmpanelCompany = () => {
    const instranceTpa = companyDetails?.tpaCompany
      ? companyDetails?.tpaCompany
      : companyDetails?.insuranceCompany;

    const companyData = userDetails?.data?.empanelledCompanies?.filter(
      (company) => company.name === instranceTpa
    )?.[0];

    setRateListDetails(companyData);
  };

  useEffect(() => {
    if (Object.entries(userDetails).length) {
      filterEmpanelCompany();
    }
  }, [userDetails]);

  return (
    <Modal
      isOpen={openRatelistModal}
      className={`absolute top-1/2 left-1/2 max-w-[550px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenRatelistModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <div className='flex justify-between items-center  w-full'>
          <p className='text-white font-semibold text-2xl'>Rate List</p>
          <IoClose
            className=' text-2xl text-white bg-red-600 p-1 rounded-full  cursor-pointer'
            onClick={toggleOpenRatelistModal}
          />
        </div>

        <div className='text-center pt-5'>
          {rateListDetails ? (
            <SharedButton
              text='View Rate List'
              style='mx-auto bg-green-500'
              handleClick={() => {
                window.open(rateListDetails.ratelist);
              }}
            />
          ) : (
            <p className='text-white text-center'>
              Selcted Insurance/ TPA Company not empanelled by hospital
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RateListModal;
