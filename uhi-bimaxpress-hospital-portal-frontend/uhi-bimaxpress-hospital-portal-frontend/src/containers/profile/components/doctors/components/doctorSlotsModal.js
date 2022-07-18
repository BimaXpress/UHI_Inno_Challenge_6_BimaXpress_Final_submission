import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import Input from '../../../../shared/input/input';
import InputDate from '../../../../shared/inputDate';
import SharedSelect from '../../../../shared/SharedSelect';
import styles from './doctorViewAddModal.module.css';
import SharedButton from '../../../../shared/button';
import axios from 'axios';
import notification from '../../../../shared/notification';
import { format } from 'date-fns';
import style from '../../../../../scrollbar.module.css';

const slotDurationOption = [
  { value: 10, label: '10 Minutes' },
  { value: 15, label: '15 Minutes' },
  { value: 30, label: '30 Minutes' },
  { value: 60, label: '60 Minutes' },
];

const DoctorsSlotsModal = (props) => {
  const {
    openSlotsModal,
    toggleOpenSlotsModal,
    toggleOpenExistingSlotModal,
    userDetails,
    selectedDoctor,
    setSharedLoaderActivity,
  } = props;
  const [slotData, setSlotData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    duration: '',
  });

  const [endTime, setEndTime] = useState('');

  const [timeOptions, setTimeOptions] = useState([]);

  const [previewOptions, setPreviewOptions] = useState([]);

  const handleChangeSlotData = (field) => {
    const { name, value } = field.target;
    setSlotData((pre) => ({ ...pre, [name]: value }));
  };

  const tConvert = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
  };

  const calculateTimeOptions = () => {
    let time = slotData?.startTime.split(':');
    let duration = Number(slotData?.duration);
    let minutesValue = Number(time[1]);
    let hourValue = Number(time[0]);
    let startTime = '';
    let endTime = '';
    let slot = [];

    do {
      startTime = tConvert(
        `${('0' + String(hourValue)).slice(-2)}:${(
          '0' + String(minutesValue)
        ).slice(-2)}`
      );
      minutesValue = minutesValue + duration;
      if (minutesValue > 59) {
        hourValue = hourValue + 1;
        minutesValue = minutesValue - 60;
      }

      endTime = tConvert(
        `${hourValue === 24 ? '00' : ('0' + String(hourValue)).slice(-2)}:${(
          '0' + String(minutesValue)
        ).slice(-2)}`
      );

      slot.push({ startTime: startTime, endTime: endTime });
    } while (hourValue < 24);

    setTimeOptions(slot);
  };

  const checkSlotDetails = () => {
    if (slotData?.date?.length !== 10) {
      notification('warning', 'Invaild Date');
      return false;
    }

    if (slotData?.startTime?.length !== 5) {
      notification('warning', 'Invaild Start Time');
      return false;
    }

    if (!slotData?.duration) {
      notification('warning', 'Select Duration');
      return false;
    }

    if (endTime === '') {
      notification('warning', 'Select End Time');
      return false;
    }

    return true;
  };

  const handleSubmitSlotDetails = async () => {
    if (!checkSlotDetails()) {
      return;
    }

    let bodyData = [];

    previewOptions.map((option) => {
      bodyData.push({
        date: slotData?.date,
        slotStart: option?.startTime,
        duration: Number(slotData?.duration),
        type: 'inClinic',
        status: 'active',
      });
    });

    setSharedLoaderActivity(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_HOSPITAL_API}/slot/createSlot?hospitalId=${userDetails?.data?._id}&doctorId=${selectedDoctor?._id}`,
        { slots: bodyData }
      );

      setSharedLoaderActivity(false);
      toggleOpenSlotsModal();
      notification('success', 'Slots Created Successfully');
    } catch (error) {
      setSharedLoaderActivity(false);
      if (
        error.response?.data?.error?.message ===
        'Conflict, Doctor would be busy in the other slot'
      ) {
        notification(
          'info',
          'Doctor would be busy in the other slot, Check Existing Slots'
        );
      } else {
        notification('error', error.message);
      }
    }
  };

  useEffect(() => {
    if (slotData?.date && slotData?.startTime && slotData?.duration) {
      setEndTime('');

      calculateTimeOptions();
    }
  }, [slotData]);

  useEffect(() => {
    if (endTime !== '') {
      const options = [];
      for (let index = 0; index <= endTime; index++) {
        options.push(timeOptions[index]);
      }

      setPreviewOptions(options);
    } else {
      setPreviewOptions([]);
    }
  }, [endTime]);

  return (
    <Modal
      isOpen={openSlotsModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenSlotsModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor  lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-5 right-5 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleOpenSlotsModal}
        />
        <p className='text-white text-2xl'>Create Slots</p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
          <Input
            name='name'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={false}
            label='Name'
            value={selectedDoctor.name}
          />

          <Input
            name='email'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={false}
            label='Email'
            value={selectedDoctor.email}
          />

          <div className='w-full grid grid-cols-2 gap-x-4'>
            <InputDate
              handleChange={handleChangeSlotData}
              name='date'
              label={
                <>
                  Date<span className='text-red-500 ml-1'>*</span>
                </>
              }
              value={slotData?.date}
              style={{ height: '42px' }}
            />
            <InputDate
              handleChange={handleChangeSlotData}
              name='startTime'
              label={
                <>
                  Start Time<span className='text-red-500 ml-1'>*</span>
                </>
              }
              value={slotData?.startTime}
              type='time'
              style={{ height: '42px' }}
            />
          </div>

          <div className='w-full grid grid-cols-2 gap-x-4'>
            <SharedSelect
              options={slotDurationOption}
              handleChange={handleChangeSlotData}
              name='duration'
              value={slotData?.duration}
              style='!h-10'
              defaultOption='Select Slot Duration'
              label={
                <>
                  Slot Duration<span className='text-red-500 ml-1'>*</span>
                </>
              }
              lightMode={false}
            />

            <SharedSelect
              options={timeOptions.map((data, index) => ({
                value: index,
                label: data.endTime,
              }))}
              handleChange={(e) => setEndTime(e.target.value)}
              name='endTime'
              value={endTime}
              style='!h-10'
              defaultOption='Select End Time'
              label={
                <>
                  End Time<span className='text-red-500 ml-1'>*</span>
                </>
              }
            />
          </div>
        </div>

        <div className='bg-primary my-2 rounded'>
          {previewOptions.length ? (
            <div
              className={`grid text-white gap-1.5 grid-cols-5 text-center max-h-28 overflow-y-auto ${style.customScroll} p-1`}
            >
              {previewOptions.map((option) => {
                return (
                  <p className='bg-ternary p-1 rounded'>
                    {option.startTime}-{option.endTime}
                  </p>
                );
              })}
            </div>
          ) : (
            <p className='text-center text-white py-1'>
              Fill Details to Preview slots
            </p>
          )}
        </div>
        <button
          onClick={() => {
            toggleOpenSlotsModal();
            toggleOpenExistingSlotModal();
          }}
          className='text-blue-500 py-1 underline'
        >
          View Existing Slots
        </button>

        <div className='flex justify-end'>
          <SharedButton
            handleClick={handleSubmitSlotDetails}
            name='createSlot'
            text='Create'
          />
        </div>
      </div>
    </Modal>
  );
};

export default DoctorsSlotsModal;
