import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './rejectModal.module.css';
import SharedButton from '../../../shared/button';
import InputRadio from '../../../shared/inputRadio';

const RejectModal = (props) => {
  const {
    rejectModal,
    toggleRejectModal,
    setRejectReason,
    rejectReason,
    handleActionClick,
  } = props;

  const RejectReasons = [
    'Applicant Not Providing Docs',
    'Bad cibil report',
    'Debt ratio criteria not met',
    'Defaulter with other financer',
    'Documents not available',
    'Employer company not found / Strike off',
    'Not interested',
  ];
  return (
    <Modal
      isOpen={rejectModal}
      className={`absolute top-1/2 left-1/2 max-w-[600px] h-auto outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleRejectModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor h-auto ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 text-xl text-gray-300 cursor-pointer'
          onClick={toggleRejectModal}
        />
        <p className='text-white font-semibold text-2xl pb-2'>Reject</p>

        <div className='col-span-1 mt-2'>
          <div>
            <p className='pb-4 text-sm text-white'>
              Why Do You Want to Reject?{' '}
              <span className='text-red-500 ml-1'>*</span>
            </p>

            {RejectReasons.map((reasons) => {
              return (
                <>
                  <div className='mr-8 mb-3'>
                    <InputRadio
                      handleChange={(e) => {
                        setRejectReason(e.target.value);
                      }}
                      name='reasonToreject'
                      value={reasons}
                      radioLabel={reasons}
                      fieldName={rejectReason}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className='flex flex-row m-5 mb-2 justify-center gap-x-5'>
          <SharedButton
            name='rejectSubmit'
            text='Reject'
            style='bg-red-500'
            handleClick={() => {
              handleActionClick('rejectSubmit');
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
