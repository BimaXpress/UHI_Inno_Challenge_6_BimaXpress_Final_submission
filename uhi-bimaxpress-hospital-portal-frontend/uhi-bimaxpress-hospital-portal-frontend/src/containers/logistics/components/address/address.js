import React, { useState, useEffect } from 'react';
import axios from 'axios';
import notification from '../../../shared/notification';
import AddAddressModal from './components/addAddressModal';
import getPickUpAddress from '../../../../client/logistics/address';

const Address = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;

  const [addressList, setAddressList] = useState([]);
  const [addAddress, setAddAddress] = useState({
    name: '',
    email: '',
    pickup_location: '',
    address: '',
    phone: '',
    city: '',
    country: '',
    state: '',
    pin_code: '',
  });

  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const toggleAddAddressModal = () => {
    setOpenAddAddressModal((pre) => !pre);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddAddress((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userDetails?.data?._id) {
      getPickUpAddress(
        userDetails?.data,
        setSharedLoaderActivity,
        setAddressList
      );
    }
  }, [userDetails]);

  useEffect(() => {
    console.log('Add new adress', addAddress);
  }, [addAddress]);

  const checkFormFeild = () => {
    if (addAddress?.name.length < 4) {
      notification('error', 'Name must be at least 4 characters.');
      return false;
    }

    if (
      !String(addAddress?.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      notification('error', 'Please insert a valid email address.');
      return false;
    }

    if (addAddress?.phone.length !== 10) {
      notification('error', 'Please enter a valid phone number.');
      return false;
    }

    if (addAddress?.pickup_location.length < 4) {
      notification('error', 'Location name must be at least 4 characters.');
      return false;
    }

    if (
      !String(addAddress?.address).match(/(\d+\s*(?:[A-Z](?![A-Z]))?)/) ||
      addAddress?.address.length < 15
    ) {
      notification(
        'error',
        'Address must be at least 15 characters and 1 numeric character'
      );
      return false;
    }

    if (addAddress?.pin_code.length !== 6) {
      notification('error', 'Please enter a valid pin code.');
      return false;
    }

    if (addAddress?.city.length < 3) {
      notification('error', 'City name must be at least 3 characters.');
      return false;
    }

    if (addAddress?.state.length < 3) {
      notification('error', 'State name must be at least 3 characters.');
      return false;
    }

    if (addAddress?.country.length < 4) {
      notification('error', 'Country name must be at least 4 characters.');
      return false;
    }

    return true;
  };

  const addNewPickupAddress = async () => {
    if (checkFormFeild()) {
      setSharedLoaderActivity(true);
      try {
        const newHospitalListData = await axios.post(
          `${process.env.REACT_APP_LOGISTICS_API}/logistic/createPickupAddress?hospitalId=${userDetails?.data._id}`,
          addAddress
        );

        console.log('new address list  ...', newHospitalListData.data);

        if (userDetails?.data?._id) {
          getPickUpAddress(
            userDetails?.data,
            setSharedLoaderActivity,
            setAddressList
          );
        }
        notification('success', 'Address successfully added');
        toggleAddAddressModal();
        setSharedLoaderActivity(false);
      } catch (error) {
        //
        //@ts-ignore
        setSharedLoaderActivity(false);
        const { response } = error;
        const { request, ...errorObject } = response;
        console.log('xfxxdfsd', response);

        // console.log("error creating order..........", error);
        notification('error', errorObject.data.error.message);
      }
    }
  };

  return (
    <>
      <div className='text-white w-full h-full flex-col'>
        <div className='py-5 flex justify-between'>
          <p className='text-white text-semibold text-lg'>Address</p>
          <button
            className={` rounded py-1 pl-2  bg-green-600 hover:bg-green-500 sm:p-2 sm:pl-4 text-white text-sm text-left `}
            onClick={toggleAddAddressModal}
          >
            <i className='fa-solid fa-plus'></i>
            <span className='mx-2 text-sm font-semibold visible sm:visible '>
              Add Address
            </span>
          </button>
        </div>
        <div className='flex flex-col space-y-4'>
          {addressList &&
            addressList.map((address) => {
              return (
                <div className='flex flex-col bg-baseColor rounded-md w-full p-3 '>
                  <div className=' flex'>
                    <p className='text-white font-bold'>{address.name}</p>
                    <p className='text-white ml-3 px-2 py-1 rounded text-xs bg-orange'>
                      {address.pickupName}
                    </p>
                  </div>
                  <p className='text-white'>{address.email}</p>
                  <p className='text-white'>+91{address.phone}</p>
                  <p className='text-gray-400'>{`${address.address} 
                  ${address.city} ${address.state} ${address.country} ${address.pin_code}`}</p>
                </div>
              );
            })}
        </div>

        <AddAddressModal
          closeModal={toggleAddAddressModal}
          isOpen={openAddAddressModal}
          handleChange={handleChange}
          addAddress={addAddress}
          submit={addNewPickupAddress}
        />
      </div>
    </>
  );
};

export default Address;
