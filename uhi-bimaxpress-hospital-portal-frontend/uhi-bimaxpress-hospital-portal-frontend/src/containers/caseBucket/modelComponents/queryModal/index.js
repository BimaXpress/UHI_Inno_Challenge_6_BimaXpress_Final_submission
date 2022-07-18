import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './queryModal.module.css';
import SharedButton from '../../../shared/button';
import InputRadio from '../../../shared/inputRadio';

const QueryModal = (props) => {
  const {
    queryModal,
    toggleQueryModal,
    queryType,
    setQueryType,
    handleActionClick,
    query,
    setQuery,
  } = props;
  return (
    <Modal
      isOpen={queryModal}
      className={`absolute top-1/2 left-1/2 max-w-[650px] h-auto outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleQueryModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={`relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor h-auto ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 text-xl text-gray-300 cursor-pointer'
          onClick={toggleQueryModal}
        />
        <p className='text-white font-semibold text-2xl pb-2'>Query</p>

        <div className='flex flex-col'>
          <p className='text-white mb-1'>
            {' '}
            Query Type <span className='text-red-500 ml-1'>*</span>
          </p>
          <div className='flex'>
            <div className=''>
              <InputRadio
                handleChange={(e) => {
                  setQueryType(e.target.value);
                }}
                name='Query_Recieved'
                value='Query Recieved'
                radioLabel='Query Recieved'
                fieldName={queryType}
              />
            </div>
            <div className='ml-5'>
              <InputRadio
                handleChange={(e) => {
                  setQueryType(e.target.value);
                }}
                name='Query_Submitted'
                value='Query Submitted'
                radioLabel='Query Submitted'
                fieldName={queryType}
              />
            </div>
          </div>
        </div>

        <div className='text-white pt-5'>
          <p className='py-2'>Write your query</p>
          <textarea
            className='bg-primary rounded p-2 w-full h-32 focus:outline-none'
            placeholder='Write your query'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <div className='flex flex-row m-5 mb-2 justify-center gap-x-5'>
          <SharedButton
            name='query'
            text='Raise Query'
            style='bg-yellow-500'
            handleClick={() => {
              handleActionClick('querySubmit');
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QueryModal;
