import React, { useState, useEffect } from 'react';
import Input from '../../../../../shared/input/input';

const EditHospital = (props) => {
  const { hospitalDetails, setHospitalDetails } = props;
  const { sharedLoader, userDetails } = props.state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === 'buildingNumber' ||
      name === 'area' ||
      name === 'landmark' ||
      name === 'city' ||
      name === 'state' ||
      name === 'country' ||
      name === 'pinCode'
    ) {
      if (name === 'pinCode') {
        setHospitalDetails((pre) => ({
          ...pre,
          currentAddress: {
            ...pre?.currentAddress,
            [name]: Number(value),
          },
        }));
      } else {
        setHospitalDetails((pre) => ({
          ...pre,
          currentAddress: {
            ...pre?.currentAddress,
            [name]: value,
          },
        }));
      }
      return;
    }

    if (name === 'contactNumber') {
      setHospitalDetails((pre) => ({
        ...pre,
        [name]: {
          number: Number(value),
          countryCode: '+91',
        },
      }));
      return;
    }
    setHospitalDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='text-green-500 grid grid-cols-2 gap-x-5 gap-y-2 w-full'>
        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Hospital Name <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='name'
          value={hospitalDetails?.name || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Contact Number <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='contactNumber'
          value={hospitalDetails?.contactNumber?.number || ''}
          type='number'
          maxLength='10'
        />
        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Contact Number <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='contactNumber'
          value={hospitalDetails?.contactNumber?.number || ''}
          type='number'
        />
        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Building Number <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='buildingNumber'
          value={hospitalDetails?.currentAddress?.buildingNumber || ''}
          type='text'
        />
        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Area <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='area'
          value={hospitalDetails?.currentAddress?.area || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Landmark <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='landmark'
          value={hospitalDetails?.currentAddress?.landmark || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              City <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='city'
          value={hospitalDetails?.currentAddress?.city || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              State <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='state'
          value={hospitalDetails?.currentAddress?.state || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Pin Code <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='pinCode'
          value={hospitalDetails?.currentAddress?.pinCode || ''}
          maxLength='6'
          type='number'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Registration Number <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='hospitalRegistrationNumber'
          value={hospitalDetails?.hospitalRegistrationNumber || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              Rohini Code <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='rohiniCode'
          value={hospitalDetails?.rohiniCode || ''}
          type='text'
        />

        <Input
          placeHolder='Number Of Days In Hospital'
          label={
            <>
              GST Number <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChange}
          name='gstNumber'
          value={hospitalDetails?.gstNumber || ''}
          type='text'
        />
      </div>
    </>
  );
};

export default EditHospital;
