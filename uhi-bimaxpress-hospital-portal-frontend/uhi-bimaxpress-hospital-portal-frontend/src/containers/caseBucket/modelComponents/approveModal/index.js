import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './approveModal.module.css';
import SharedButton from '../../../shared/button';
import Input from '../../../shared/input/input';

const ApproveModal = (props) => {
  const {
    handleActionClick,
    approveModal,
    toggleApproveModal,
    amount,
    setAmount,
  } = props;

  return (
    <Modal
      isOpen={approveModal}
      className={`absolute top-1/2 left-1/2 max-w-[600px] h-auto outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleApproveModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor h-auto ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 text-xl text-gray-300 cursor-pointer'
          onClick={toggleApproveModal}
        />
        <p className='text-white font-semibold text-2xl pb-2'>Approve</p>

        <Input
          label={
            <>
              Approve Amount <span className='text-red-500 ml-1'>*</span>
            </>
          }
          placeHolder='Enter Approve Amount'
          type='number'
          maxLength='6'
          value={amount || ''}
          handleChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <div className='flex flex-row m-5 mb-2 justify-center gap-x-5'>
          <SharedButton
            name='Approve'
            text='Approve'
            handleClick={() => handleActionClick('approveSubmit')}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ApproveModal;
