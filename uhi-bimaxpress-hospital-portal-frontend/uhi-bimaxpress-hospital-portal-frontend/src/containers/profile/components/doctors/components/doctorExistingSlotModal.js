import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './doctorViewAddModal.module.css';
import InputDate from '../../../../shared/inputDate';
import { format } from 'date-fns';
import axios from 'axios';
import notification from '../../../../shared/notification';
import style from '../../../../../scrollbar.module.css';

const DoctorExistingSlotModal = (props) => {
  const {
    openExistingSlotModal,
    toggleOpenExistingSlotModal,
    selectedDoctor,
    setSharedLoaderActivity,
  } = props;

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [slotData, setSlotData] = useState([]);
  const [filterSlots, setFilterSlots] = useState('');

  const fetchSlotData = async () => {
    setSharedLoaderActivity(true);
    try {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/slot/getSlots?doctorId=${selectedDoctor?._id}`
      );

      setSlotData(data);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    fetchSlotData();
  }, []);

  useEffect(() => {
    if (slotData?.length) {
      setFilterSlots(
        slotData.filter(
          (slot) => format(new Date(slot?.date), 'yyyy-MM-dd') === date
        )
      );
    }
  }, [date, slotData]);

  return (
    <Modal
      isOpen={openExistingSlotModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenExistingSlotModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor  lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-5 right-5 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleOpenExistingSlotModal}
        />
        <p className='text-white text-2xl'>Existing Slots</p>

        <InputDate
          handleChange={(e) => {
            setDate(e?.target?.value);
          }}
          name='date'
          label={<>Pick a date</>}
          value={date}
          style={{ height: '42px' }}
        />
        <div className='bg-primary my-2 rounded'>
          {filterSlots.length ? (
            <div
              className={`grid text-white gap-1.5 grid-cols-5 text-center max-h-28 overflow-y-auto ${style.customScroll} p-1`}
            >
              {filterSlots.map((slot) => {
                return (
                  <p className='bg-ternary p-1 rounded'>
                    {slot.slotStart}-{slot.slotEnd}
                  </p>
                );
              })}
            </div>
          ) : (
            <p className='text-center text-white py-1'>
              No slots on selected date
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DoctorExistingSlotModal;
