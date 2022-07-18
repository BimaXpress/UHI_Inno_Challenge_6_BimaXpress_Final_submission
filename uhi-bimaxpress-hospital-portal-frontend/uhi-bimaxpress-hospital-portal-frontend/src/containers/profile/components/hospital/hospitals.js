import React, { useState, useEffect } from 'react';
import EditHospital from './components/edit';
import HospitalDetails from './components/details';
import notification from '../../../shared/notification';
import axios from 'axios';

const Hospital = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { sharedLoader, userDetails } = props.state;

  const [hospitalDetails, setHospitalDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setHospitalDetails(userDetails.data);
    }
  }, [userDetails]);

  useEffect(() => {
    console.log('hospitalDetails ... ..', hospitalDetails);
  }, [hospitalDetails]);

  const updateHospitals = async () => {
    if (isEdit) {
      setSharedLoaderActivity(true);
      delete hospitalDetails['email'];
      delete hospitalDetails['password'];
      delete hospitalDetails['orignalPassword'];
      delete hospitalDetails['doctors'];

      const bodyObject = {
        updateData: hospitalDetails,
      };

      try {
        const updateHospital = await axios.put(
          `${process.env.REACT_APP_HOSPITAL_API}/hospital/updateHospital?id=${hospitalDetails._id}`,
          bodyObject
        );
        console.log('updateHospital data', updateHospital);
        setSharedLoaderActivity(false);
        setUserDetailsActivity({
          data: updateHospital.data.data,
        });
        notification('success', 'Hospital details updated successfully');
        setIsEdit(!isEdit);
      } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        console.log(errorObject.data.error.message);
        setSharedLoaderActivity(false);
        notification('error', errorObject.data.error.message);
      }
    } else {
      setIsEdit(!isEdit);
    }
  };

  return userDetails ? (
    <>
      <div className='bg-black w-full flex-col'>
        <div className='flex flex-row justify-between  w-full'>
          <p className='text-white text-base font-semibold'>
            {isEdit ? 'Update Hospital' : 'Hospital Details'}
          </p>
          <button
            className={` rounded py-1 pl-2  bg-green-600 hover:bg-green-500 sm:p-2 sm:pl-4 text-white text-sm text-left `}
            onClick={updateHospitals}
          >
            <i
              className={isEdit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-pen'}
            ></i>
            <span className='mx-2 text-sm font-semibold visible sm:visible '>
              {isEdit ? 'Save' : 'Update'}
            </span>
          </button>
        </div>
        <div className='mt-5 w-full'>
          {isEdit ? (
            <EditHospital
              hospitalDetails={hospitalDetails}
              setHospitalDetails={setHospitalDetails}
            />
          ) : (
            <HospitalDetails />
          )}
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );

  if (!isEdit) {
    return <></>;
  } else {
    return (
      <>
        <EditHospital />
      </>
    );
  }
};

export default Hospital;
