import { useState, useEffect } from 'react';
import SharedSelect from '../../../shared/SharedSelect';
import InputDate from '../../../shared/inputDate';
import { useNavigate } from 'react-router-dom';

const AppointmentDetails = (props) => {
  const {
    doctorOptions,
    fetchDoctor,
    appointemnetDetails,
    handleChangeAppointemnetDetails,
    slotOptions = { slotOptions },
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <div className='text-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
        <div>
          <SharedSelect
            options={doctorOptions}
            handleChange={handleChangeAppointemnetDetails}
            name='doctor'
            value={appointemnetDetails?.doctor}
            style='!h-10'
            defaultOption='Select Doctor'
            label={
              <>
                Select Doctor<span className='text-red-500 ml-1'>*</span>
              </>
            }
            lightMode={false}
          />
          <button
            onClick={() => navigate('/userDetails/doctors')}
            className='text-blue-500 ml-[2px]'
          >
            Want to add/create doctor?
          </button>
        </div>

        <InputDate
          handleChange={handleChangeAppointemnetDetails}
          name='date'
          label={
            <>
              Date<span className='text-red-500 ml-1'>*</span>
            </>
          }
          value={appointemnetDetails?.date}
          style={{ height: '42px', width: '240px' }}
        />

        <SharedSelect
          options={slotOptions}
          handleChange={handleChangeAppointemnetDetails}
          name='slot'
          value={appointemnetDetails?.slot}
          style='!h-10'
          defaultOption='Select Slot'
          label={
            <>
              Select Slot<span className='text-red-500 ml-1'>*</span>
            </>
          }
          lightMode={false}
        />
      </div>
    </div>
  );
};

export default AppointmentDetails;
