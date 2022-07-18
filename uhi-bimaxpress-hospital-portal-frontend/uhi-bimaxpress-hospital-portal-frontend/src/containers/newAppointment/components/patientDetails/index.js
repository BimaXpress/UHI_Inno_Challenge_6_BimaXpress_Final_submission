import { useState, useEffect } from 'react';
import InputRadio from '../../../shared/inputRadio';
import Input from '../../../shared/input/input';
import InputDate from '../../../shared/inputDate';
import SearchCreateableSelect from '../../../shared/searchCreateableSelect/searchCreateableSelect';
import axios from 'axios';
import notification from '../../../shared/notification';

const PatientDetails = (props) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { patientDetails, handleChangePatientDetails, setPatientDetails } =
    props;
  const [customerSelect, setCustomerSelect] = useState(null);

  const loadCustomerOptions = async (inputValue) => {
    const customers = await axios.get(
      `${process.env.REACT_APP_HOSPITAL_API}/customer/getCustomers?page=1&limit=5&email=${inputValue}`
    );

    return customers?.data?.data;
  };

  const genratePassword = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleChangeCustomerSelect = (selected) => {
    if (selected === null) {
      setPatientDetails({
        email: '',
        name: '',
        contactNumber: {
          number: '',
        },
        age: '',
        address: '',
        gender: 'male',
        password: '',
        isNew: true,
      });
    } else if (selected?.__isNew__) {
      if (!String(selected?.value).toLowerCase().match(regexEmail)) {
        return notification(
          'warning',
          'Either enter a vaild email or keep it blank'
        );
      } else {
        setPatientDetails((pre) => {
          return {
            ...pre,
            email: selected?.value,
            password: genratePassword(6),
            isNew: true,
          };
        });
      }
    } else {
      setPatientDetails((pre) => {
        return { ...pre, ...selected, isNew: false };
      });
    }

    setCustomerSelect(selected);
  };

  useEffect(() => {
    if (patientDetails?.email) {
      setCustomerSelect(patientDetails);
    } else {
      setCustomerSelect(null);
    }
  }, []);

  return (
    <div className='text-white'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8'>
        <div>
          <SearchCreateableSelect
            label={<>Email Address</>}
            name='email'
            handleChangeSelect={handleChangeCustomerSelect}
            loadOptions={loadCustomerOptions}
            selectValue={customerSelect}
            getOptionValue={(e) => e.email}
            placeholder={'Select Customer or Create new one'}
          />
        </div>

        <Input
          placeHolder='Name'
          label={
            <>
              Name
              <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChangePatientDetails}
          name='name'
          value={patientDetails.name}
          isEdit={patientDetails?.isNew}
        />

        <div className='my-4'>
          <p className={`text-white font-semibold items-start`}>
            Gender
            <span className='ml-1 text-red-500'>*</span>
          </p>
          <div className='flex flex-row pt-6 gap-x-4'>
            <InputRadio
              handleChange={handleChangePatientDetails}
              name='gender'
              value={'male'}
              radioLabel='Male'
              fieldName={patientDetails?.gender}
            />
            <InputRadio
              handleChange={handleChangePatientDetails}
              name='gender'
              value={'female'}
              radioLabel='Female'
              fieldName={patientDetails?.gender}
            />
          </div>
        </div>

        <Input
          placeHolder='Contact Number'
          label={
            <>
              Contact Number
              <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChangePatientDetails}
          name='number'
          value={patientDetails?.contactNumber?.number}
          type={'number'}
          maxLength={'10'}
          isEdit={patientDetails?.isNew}
        />

        <Input
          placeHolder='Age'
          label={
            <>
              Age
              <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChangePatientDetails}
          name='age'
          value={patientDetails?.age}
          type={'number'}
          maxLength={'3'}
        />

        <Input
          placeHolder='Address'
          label={
            <>
              Address
              <span className='ml-1 text-red-500'>*</span>
            </>
          }
          handleChange={handleChangePatientDetails}
          name='address'
          value={patientDetails?.address}
          maxLength={'50'}
        />
        {/* <div className='flex flex-row-3 gap-x-4'>
          <InputDate
            handleChange={handleChangePatientDetails}
            name='dateOfBirth'
            label={
              <>
                Date of Birth{' '}
                {patientDetails?.isNew ? (
                  <span className='ml-1 text-red-500'>*</span>
                ) : (
                  ''
                )}
              </>
            }
            style={{ width: '200px' }}
            value={patientDetails?.dateOfBirth?.split('T')[0]}
            isEdit={patientDetails?.isNew}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PatientDetails;
