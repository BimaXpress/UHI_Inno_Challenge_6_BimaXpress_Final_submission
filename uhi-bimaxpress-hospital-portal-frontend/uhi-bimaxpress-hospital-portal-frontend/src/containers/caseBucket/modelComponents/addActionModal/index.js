import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './addActionModal.module.css';
import SharedButton from '../../../shared/button';
import SharedSelect from '../../../shared/SharedSelect';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import eyeIcon from '../../../../assets/icon/eye.svg';
import axios from 'axios';
import notification from '../../../shared/notification';
import { useNavigate } from 'react-router-dom';
import paperclip from '../../../../assets/icon/paperclip.svg';
import Input from '../../../shared/input/input';
import InputDate from '../../../shared/inputDate';
import InputRadio from '../../../shared/inputRadio';
import Request from './Request';
import SentMailModal from '../sendMailModal';
import style from '../../../../scrollbar.module.css';

const actions = [
  {
    label: 'Unprocessed',
    value: 'Unprocessed',
  },
  {
    label: 'Query',
    value: 'Query',
  },
  {
    label: 'Approved',
    value: 'Approved',
  },
  {
    label: 'Reject',
    value: 'Reject',
  },
  {
    label: 'Enhance',
    value: 'Enhance',
  },
  {
    label: 'FCI',
    value: 'FCI',
  },
  {
    label: 'Discharge Approved',
    value: 'Discharge Approved',
  },
  {
    label: 'Settled',
    value: 'Settled',
  },
];

const AddActionModal = (props) => {
  const {
    openAddActionModal,
    toggleAddActionModal,
    selectedAction,
    setSelectedAction,
    setSharedLoaderActivity,
    summaryData,
    userDetails,
  } = props;

  const navigate = useNavigate();

  const [data, setData] = useState({
    file: [],
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [status, setStatus] = useState('request');

  // message In case of Unprocessed and Settled
  const updateCase = async () => {
    const formStatus = new FormData();
    formStatus.append('caseId', summaryData?._id);
    switch (selectedAction) {
      case 'Unprocessed':
        formStatus.append('formStatus', 'Unprocess');
        formStatus.append('action', 'Unprocessed');
        formStatus.append('summary', 'Unprocessed');
        break;
      case 'Settled':
        if (data?.amount === '') {
          return notification('warning', 'Amount is required');
        }

        formStatus.append('formStatus', 'Settled');
        formStatus.append('action', 'Settled');
        formStatus.append('summary', 'Settled');
        formStatus.append('amount', data?.amount);
        break;
    }

    setSharedLoaderActivity(true);
    try {
      const changeStatus = await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );
      console.log('change Status response ---------> ', changeStatus);
      setSharedLoaderActivity(false);
      notification('success', `Case moved ${selectedAction} successfully`);
      toggleAddActionModal();

      navigate('/');
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const rejectCase = async () => {
    const formStatus = new FormData();
    formStatus.append('caseId', summaryData?._id);

    if (selectedAction === 'Reject') {
      formStatus.append('formStatus', 'Reject');
      formStatus.append('action', 'Reject');
      formStatus.append('summary', 'Rejected');
    }

    if (selectedAction === 'Enhance' && status === 'rejected') {
      formStatus.append('formStatus', 'Enhance');
      formStatus.append('action', 'Enhance');
      formStatus.append('summary', 'Enhance Rejected');
    }

    if (selectedAction === 'FCI' && status === 'rejected') {
      formStatus.append('formStatus', 'Fci');
      formStatus.append('action', 'Fci');
      formStatus.append('summary', 'Final Claim Rejected');
    }

    if (data?.file.length === 1) {
      data?.file?.forEach((img) => {
        formStatus.append('fileName[0]', img?.name);
        formStatus.append('uploadFiles', img);
      });
    } else {
      data?.file?.forEach((img) => {
        formStatus.append('fileName', img?.name);
        formStatus.append('uploadFiles', img);
      });
    }
    formStatus.append(
      'folderName',
      `Hospital/${summaryData?.hospitalDetails?.email}/${summaryData?._id}`
    );

    try {
      await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );

      setSharedLoaderActivity(false);
      toggleAddActionModal();
      notification('success', `Case moved ${selectedAction}  successfully`);
      navigate('/');
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const approvedCase = async () => {
    if (data?.amount === '') {
      return notification('warning', 'Amount is required');
    }
    const formStatus = new FormData();
    formStatus.append('caseId', summaryData?._id);
    formStatus.append('amount', data?.amount);
    formStatus.append(
      'lastDate',
      format(new Date(data?.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    );

    if (
      selectedAction === 'Approved' ||
      selectedAction === 'Discharge Approved'
    ) {
      if (selectedAction === 'Discharge Approved' && !data?.file.length) {
        return notification('warning', 'Need to Upload a File!');
      }

      formStatus.append('formStatus', selectedAction);
      formStatus.append('action', selectedAction);
      formStatus.append('summary', selectedAction);
    }

    if (selectedAction === 'Enhance' && status === 'approved') {
      formStatus.append('formStatus', 'Enhance');
      formStatus.append('action', 'Enhance');
      formStatus.append('summary', 'Enhance Approved');
    }

    if (data?.file.length === 1) {
      data?.file?.forEach((img) => {
        formStatus.append('fileName[0]', img?.name);
        formStatus.append('uploadFiles', img);
      });
    } else {
      data?.file?.forEach((img) => {
        formStatus.append('fileName', img?.name);
        formStatus.append('uploadFiles', img);
      });
    }
    formStatus.append(
      'folderName',
      `Hospital/${summaryData?.hospitalDetails?.email}/${summaryData?._id}`
    );
    try {
      const changeStatus = await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );
      // console.log('change Status response ---------> ', changeStatus);
      toggleAddActionModal();
      setSharedLoaderActivity(false);
      notification('success', `Case moved ${selectedAction} successfully`);
      navigate('/');
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    if (name === 'file') {
      setData((pre) => ({
        ...pre,
        [name]: [...pre[name], ...e?.target?.files],
      }));
    } else {
      setData((pre) => ({ ...pre, [name]: value }));
    }
  };

  const removeImage = (name) => {
    setData((pre) => ({
      ...pre,
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const [openSendMailModal, setOpenSendMailModal] = useState(false);
  function toggleSentMailModal() {
    setOpenSendMailModal((pre) => !pre);
  }

  useEffect(() => {
    if (selectedAction === 'Query') {
      toggleSentMailModal();
    }
  }, [selectedAction]);

  return (
    <>
      <Modal
        isOpen={openAddActionModal}
        className={`absolute top-1/2 left-1/2 max-w-[700px] max-h-[500px] overflow-y-auto outline-none ${styles.modalContainer} ${style.customScroll}`}
        overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
        ariaHideApp={false}
        onRequestClose={toggleAddActionModal}
        shouldCloseOnOverlayClick={true}
      >
        <div
          className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor h-auto ${styles.mainContainer}`}
        >
          <IoClose
            className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
            onClick={toggleAddActionModal}
          />
          <div className='flex flex-row'>
            <p
              className={`text-white font-semibold text-2xl pb-3 cursor-pointer`}
            >
              Add Action
            </p>
          </div>

          {selectedAction === 'Unprocessed' ||
          selectedAction === 'Settled' ||
          selectedAction === 'Query' ||
          selectedAction === '' ? (
            <SharedSelect
              name='addAction'
              defaultOption='Select Action'
              value={selectedAction}
              options={actions}
              handleChange={(e) => setSelectedAction(e.target.value)}
              style='!h-10'
            />
          ) : null}

          {selectedAction === 'Settled' && (
            <div className='grid grid-cols-2 pt-2'>
              <Input
                placeHolder='Amount'
                label={
                  <>
                    Amount <span className='text-red-500 ml-1'>*</span>
                  </>
                }
                handleChange={handleChange}
                name='amount'
                value={data?.amount || ''}
                type='number'
              />
            </div>
          )}

          {selectedAction === 'Unprocessed' || selectedAction === 'Settled' ? (
            <div className='flex flex-row justify-center mt-5'>
              <SharedButton
                text='Submit'
                style={`bg-green-500`}
                name='submit'
                handleClick={updateCase}
              />
            </div>
          ) : null}

          {selectedAction === 'Approved' ||
          selectedAction === 'Discharge Approved' ? (
            <>
              <div className='flex flex-row justify-center my-6'>
                <div className='w-full h-auto border-2 border-gray-600 rounded-lg text-center'>
                  <p className='text-sm text-fontColor-gray pt-4'>
                    Upload your documents here
                  </p>
                  <div className='flex items-center justify-center mt-4'>
                    {data?.file?.length
                      ? data?.file?.map((file, index) => {
                          return (
                            <div
                              className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                              style={{ width: '100%', maxWidth: '145px' }}
                              key={index}
                            >
                              <p
                                style={{
                                  width: '100%',
                                  maxWidth: '125px',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {file?.name}
                              </p>
                              <IoClose
                                onClick={() => removeImage(file?.name)}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <div className='flex justify-center mt-8 mb-4 '>
                    <div className='relative flex items-center justify-center cursor-pointer bg-blue-500 rounded-lg w-44 h-10'>
                      <img src={paperclip} alt='icon' className='mr-2' />
                      <p className=' text-white font-semibold'>Attach file</p>
                      <input
                        type='file'
                        className='absolute border-none outline-none opacity-0 w-44 h-10 top-0 left-0 z-10 cursor-pointer'
                        name='file'
                        onChange={handleChange}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div>
                  <Input
                    placeHolder='Amount'
                    label={
                      <>
                        Amount <span className='text-red-500 ml-1'>*</span>
                      </>
                    }
                    handleChange={handleChange}
                    name='amount'
                    value={data?.amount || ''}
                    type='number'
                  />
                </div>
                <div className='px-6'>
                  <InputDate
                    handleChange={handleChange}
                    name='date'
                    label={
                      <>
                        Select Date <span className='text-red-500'>*</span>
                      </>
                    }
                    value={data?.date}
                  />
                </div>
              </div>
              <div className='flex flex-row justify-center my-6'>
                <SharedButton
                  text='Submit'
                  style={`bg-green-500`}
                  name='submit'
                  handleClick={approvedCase}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {selectedAction === 'Reject' ? (
            <>
              <div className='flex flex-row justify-center my-6'>
                <div className='w-full h-auto border-2 border-gray-600 rounded-lg text-center'>
                  <p className='text-sm text-fontColor-gray pt-4'>
                    Upload your documents here
                  </p>
                  <div className='flex items-center justify-center mt-4'>
                    {data?.file?.length
                      ? data?.file?.map((file, index) => {
                          return (
                            <div
                              className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                              style={{ width: '100%', maxWidth: '145px' }}
                              key={index}
                            >
                              <p
                                style={{
                                  width: '100%',
                                  maxWidth: '125px',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {file?.name}
                              </p>

                              <IoClose
                                onClick={() => removeImage(file?.name)}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <div className='flex justify-center mt-8 mb-4 '>
                    <div className='relative flex items-center justify-center bg-blue-500  rounded-lg w-44 h-10'>
                      <img src={paperclip} alt='icon' className='mr-2' />
                      <p className='text-white font-semibold'>Attach file</p>
                      <input
                        type='file'
                        className='absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10'
                        name='file'
                        onChange={handleChange}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-row justify-center my-6'>
                <SharedButton
                  text='Submit'
                  style={`bg-green-500`}
                  name='submit'
                  handleClick={rejectCase}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {selectedAction === 'Enhance' || selectedAction === 'FCI' ? (
            <>
              <div className='flex items-center justify-between py-4'>
                <div className='flex items-center '>
                  <div className='mr-8'>
                    <InputRadio
                      handleChange={(e) => setStatus(e?.target?.value)}
                      name='request'
                      value='request'
                      radioLabel='Request'
                      fieldName={status || ''}
                    />
                  </div>
                  <div className='mr-8'>
                    <InputRadio
                      handleChange={(e) => setStatus(e?.target?.value)}
                      name='rejected'
                      value='rejected'
                      radioLabel='Rejected'
                      fieldName={status || ''}
                    />
                  </div>
                  {selectedAction === 'Enhance' ? (
                    <div className='mr-8'>
                      <InputRadio
                        handleChange={(e) => setStatus(e?.target?.value)}
                        name='approved'
                        value='approved'
                        radioLabel='Approved'
                        fieldName={status || ''}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {status === 'rejected' ? (
                <>
                  <div className='flex flex-row justify-center my-6'>
                    <div className='w-full h-auto border-2 border-gray-600 rounded-lg text-center'>
                      <p className='text-sm text-fontColor-gray pt-4'>
                        Upload your documents here
                      </p>
                      <div className='flex items-center justify-center mt-4'>
                        {data?.file?.length
                          ? data?.file?.map((file, index) => {
                              return (
                                <div
                                  className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                                  style={{ width: '100%', maxWidth: '145px' }}
                                  key={index}
                                >
                                  <p
                                    style={{
                                      width: '100%',
                                      maxWidth: '125px',
                                      overflow: 'hidden',
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {file?.name}
                                  </p>
                                  <IoClose
                                    onClick={() => removeImage(file?.name)}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                      <div className='flex justify-center mt-8 mb-4 '>
                        <div className='relative flex items-center justify-center bg-blue-500 rounded-lg w-44 h-10'>
                          <img src={paperclip} alt='icon' className='mr-2' />
                          <p className='text-white font-semibold'>
                            Attach file
                          </p>
                          <input
                            type='file'
                            className='absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10'
                            name='file'
                            onChange={handleChange}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row justify-center my-6'>
                    <SharedButton
                      text='Submit'
                      style={`bg-green-500`}
                      name='submit'
                      handleClick={rejectCase}
                    />
                  </div>
                </>
              ) : null}
              {status === 'approved' ? (
                <>
                  <div className='flex flex-row justify-center my-6'>
                    <div className='w-full h-auto border-2 border-gray-600 rounded-lg text-center'>
                      <p className='text-sm text-fontColor-gray pt-4'>
                        Upload your documents here
                      </p>
                      <div className='flex items-center justify-center mt-4'>
                        {data?.file?.length
                          ? data?.file?.map((file, index) => {
                              return (
                                <div
                                  className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                                  style={{ width: '100%', maxWidth: '145px' }}
                                  key={index}
                                >
                                  <p
                                    style={{
                                      width: '100%',
                                      maxWidth: '125px',
                                      overflow: 'hidden',
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {file?.name}
                                  </p>

                                  <IoClose
                                    onClick={() => removeImage(file?.name)}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                      <div className='flex justify-center mt-8 mb-4 '>
                        <div className='relative flex items-center justify-center bg-blue-500 rounded-lg w-44 h-10'>
                          <img src={paperclip} alt='icon' className='mr-2' />
                          <p className='text-white font-semibold'>
                            Attach file
                          </p>
                          <input
                            type='file'
                            className='absolute border-none outline-none cursor-pointer opacity-0 w-44 h-10 top-0 left-0 z-10'
                            name='file'
                            onChange={handleChange}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-x-6'>
                    <div className=''>
                      <Input
                        placeHolder='Amount'
                        label={
                          <>
                            Amount <span className='text-red-500 ml-1'>*</span>
                          </>
                        }
                        handleChange={handleChange}
                        name='amount'
                        value={data?.amount || ''}
                        type='number'
                      />
                    </div>

                    <InputDate
                      handleChange={handleChange}
                      name='date'
                      label={
                        <>
                          Select Date <span className='text-red-500'>*</span>
                        </>
                      }
                      value={data?.date}
                    />
                  </div>
                  <div className='flex flex-row justify-center my-6'>
                    <SharedButton
                      text='Submit'
                      style={`bg-green-500`}
                      name='submit'
                      handleClick={approvedCase}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
              {status === 'request' ? (
                <Request
                  summaryData={summaryData}
                  selectedAction={selectedAction}
                  setSharedLoaderActivity={setSharedLoaderActivity}
                  userDetails={userDetails}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </Modal>

      {openSendMailModal && (
        <SentMailModal
          toggleSentMailModal={toggleSentMailModal}
          openSendMailModal={openSendMailModal}
          summaryData={summaryData}
          setSharedLoaderActivity={setSharedLoaderActivity}
          selectedAction={selectedAction}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default AddActionModal;
