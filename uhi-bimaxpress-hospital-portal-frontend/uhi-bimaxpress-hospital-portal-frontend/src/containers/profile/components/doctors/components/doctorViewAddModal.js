import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './doctorViewAddModal.module.css';
import Input from '../../../../shared/input/input';
import SharedButton from '../../../../shared/button';
import SearchCreateableSelect from '../../../../shared/searchCreateableSelect/searchCreateableSelect';
import axios from 'axios';
import notification from '../../../../shared/notification';

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const DoctorViewAddModal = (props) => {
  const {
    openDoctorViewAddModal,
    doctorViewAddModalType,
    selectedDoctor,
    toggleDoctorViewAddModal,
    setDoctorViewAddModalType,
    setSharedLoaderActivity,
    fetchDoctors,
    userDetails,
  } = props;

  const [doctorDetails, setdoctorDetails] = useState({
    name: '',
    email: '',
    qualification: '',
    specializations: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
    editDoctorFields: false,
    existing: false,
  });

  const [doctorDetailsError, setdoctorDetailsError] = useState({
    name: '',
    email: '',
    qualification: '',
    specializations: '',
    password: '',
    confirmPassword: '',
    registrationNumber: '',
  });

  const [doctorSelect, setDoctorSelect] = useState(null);

  const handleChangeDoctorSelect = (value) => {
    if (value === null) {
      setdoctorDetails({
        name: '',
        email: '',
        qualification: '',
        specializations: '',
        password: '',
        registrationNumber: '',
        editDoctorFields: true,
      });
    } else {
      if (value?.__isNew__) {
        value.editDoctorFields = true;
        value.existing = false;
        setdoctorDetails((pre) => ({ ...pre, email: value.value }));
      } else {
        value.editDoctorFields = false;
        value.existing = true;
        setdoctorDetails(value);
      }
    }

    setDoctorSelect(value);
  };

  const loadDoctorOptions = async (inputValue) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/doctor/getDoctors?email=${inputValue}`,
        { params: { limit: 5 } }
      );
      return data.data;
    } catch (error) {
      notification('error', error.message);
    }
  };

  function handleChangeDoctorData(field) {
    const { name, value } = field.target;
    setdoctorDetails((pre) => ({ ...pre, [name]: value }));

    setdoctorDetailsError((pre) => ({ ...pre, [name]: '' }));
    if (name === 'password' || name === 'confirmPassword') {
      setdoctorDetailsError((pre) => ({
        ...pre,
        password: '',
        confirmPassword: '',
      }));
    }
  }

  useEffect(() => {
    switch (doctorViewAddModalType) {
      case 'summary':
        setdoctorDetails((pre) => ({
          ...pre,
          ...selectedDoctor,
          password: selectedDoctor.orignalPassword,
          confirmPassword: selectedDoctor.orignalPassword,
        }));
        break;
      case 'update':
        setdoctorDetails((pre) => ({
          ...pre,
          editDoctorFields: true,
        }));
        break;
      case 'new':
        setdoctorDetails((pre) => ({
          ...pre,
          editDoctorFields: true,
        }));
        break;
    }
  }, [doctorViewAddModalType]);

  const deleteDoctor = async () => {
    try {
      setSharedLoaderActivity(true);
      await axios.delete(
        `${process.env.REACT_APP_HOSPITAL_API}/doctor/deleteDoctor?id=${doctorDetails._id}`
      );
      fetchDoctors();
      toggleDoctorViewAddModal();
      setSharedLoaderActivity(false);
      notification('success', 'Successfully Deleted');
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const updateDoctor = async () => {
    try {
      setSharedLoaderActivity(true);
      if (doctorViewAddModalType === 'update') {
        delete doctorDetails.hospital;
        await axios.put(
          `${process.env.REACT_APP_HOSPITAL_API}/doctor/updateDoctor?id=${doctorDetails._id}`,
          { updateData: { ...doctorDetails } }
        );
      }

      if (doctorViewAddModalType === 'new') {
        if (doctorDetails.existing === true) {
          const hospital = [userDetails?.data?._id];
          await axios.put(
            `${process.env.REACT_APP_HOSPITAL_API}/doctor/updateDoctor?id=${doctorDetails._id}`,
            { updateData: { hospital: hospital } }
          );
        }

        if (doctorDetails.existing === false) {
          await axios.post(
            `${process.env.REACT_APP_HOSPITAL_API}/doctor/registerDoctor?hospital=${userDetails?.data?._id}`,
            doctorDetails
          );
        }
      }

      setSharedLoaderActivity(false);
      fetchDoctors();
      notification(
        'success',
        `Case has been successfully ${
          doctorViewAddModalType === 'new' ? 'added' : 'updated'
        }`
      );
      toggleDoctorViewAddModal();
    } catch (error) {
      setSharedLoaderActivity(false);

      if (error?.request?.responseText?.includes('E11000 duplicate key')) {
        notification(
          'info',
          'An doctor exist with same email address, Try adding'
        );
      } else {
        notification('error', error.message);
      }
    }
  };

  const checkAndSubmitDetails = () => {
    if (!String(doctorDetails.email).toLowerCase().match(regexEmail)) {
      setdoctorDetailsError((pre) => ({
        ...pre,
        email: 'Vaild email is required',
      }));
      return notification('warning', 'Vaild email is required');
    }

    if (doctorDetails.name.length < 4) {
      setdoctorDetailsError((pre) => ({
        ...pre,
        name: 'Vaild name is required',
      }));
      return notification('warning', 'Vaild name is required');
    }

    if (doctorDetails.qualification.length < 2) {
      setdoctorDetailsError((pre) => ({
        ...pre,
        qualification: 'Vaild qualification is required',
      }));
      return notification('warning', 'Vaild qualification is required');
    }

    if (doctorDetails.editDoctorFields) {
      if (
        doctorDetails.password.length < 6 ||
        doctorDetails.password.includes(' ')
      ) {
        setdoctorDetailsError((pre) => ({
          ...pre,
          password: 'Invaild password',
        }));
        return notification('warning', 'Enter 6 characters of vaild password');
      }

      if (doctorDetails.password !== doctorDetails.confirmPassword) {
        setdoctorDetailsError((pre) => ({
          ...pre,
          password: 'Password does not match',
          confirmPassword: 'Password does not match',
        }));
        return notification('warning', 'Password does not match');
      }
    }

    if (doctorDetails.registrationNumber.length < 4) {
      setdoctorDetailsError((pre) => ({
        ...pre,
        registrationNumber: 'Vaild registration number is required',
      }));
      notification('warning', 'Vaild registration number is required');
      return true;
    }

    if (
      doctorDetails.name === '' ||
      doctorDetails.email === '' ||
      doctorDetails.qualification === '' ||
      doctorDetails.password === '' ||
      doctorDetails.confirmPassword === '' ||
      doctorDetails.registrationNumber === ''
    ) {
      return notification('warning', 'Can not left required fileds empty');
    }

    updateDoctor();
  };

  return (
    <Modal
      isOpen={openDoctorViewAddModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleDoctorViewAddModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor  lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleDoctorViewAddModal}
        />
        <p className='text-white text-2xl'>
          {doctorViewAddModalType === 'new'
            ? 'Add Doctor'
            : doctorViewAddModalType === 'update'
            ? 'Update Doctor'
            : doctorViewAddModalType === 'summary'
            ? "Doctor's Summary"
            : ''}
        </p>

        <div className='flex justify-end gap-x-2'>
          {doctorViewAddModalType === 'summary' && (
            <SharedButton
              handleClick={() => setDoctorViewAddModalType('update')}
              style='!bg-white !text-black'
              text={
                <>
                  <i className='fa-solid fa-pen mr-1' />
                  Edit
                </>
              }
            />
          )}

          {(doctorViewAddModalType === 'summary' ||
            doctorViewAddModalType === 'update') && (
            <SharedButton
              handleClick={() => deleteDoctor()}
              style='!bg-red-500'
              text={
                <>
                  <i className='fa-solid fa-trash mr-1'></i>
                  Delete
                </>
              }
            />
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
          {doctorViewAddModalType === 'new' && (
            <div>
              <SearchCreateableSelect
                label={
                  <>
                    Email Address
                    <span className='ml-1 text-red-500'>*</span>
                  </>
                }
                name='email'
                handleChangeSelect={handleChangeDoctorSelect}
                loadOptions={loadDoctorOptions}
                selectValue={doctorSelect}
                getOptionValue={(e) => e.email}
                placeholder={'Search Doctor or Create New'}
              />
            </div>
          )}

          {(doctorViewAddModalType === 'summary' ||
            doctorViewAddModalType === 'update') && (
            <div>
              <Input
                handleChange={handleChangeDoctorData}
                name='email'
                value={doctorDetails.email || ''}
                label={
                  <>
                    Email
                    {doctorDetails.editDoctorFields ? (
                      <span className='ml-1 text-red-500'>*</span>
                    ) : (
                      ''
                    )}
                  </>
                }
                placeHolder='Email'
                labelClass='text-white'
                inputStyle='h-9'
                isEdit={doctorDetails.editDoctorFields}
                message={doctorDetailsError.name}
                status={!doctorDetailsError.name ? 'active' : 'error'}
              />
            </div>
          )}

          <div>
            <Input
              handleChange={handleChangeDoctorData}
              name='name'
              value={doctorDetails.name || ''}
              label={
                <>
                  Name
                  {doctorDetails.editDoctorFields ? (
                    <span className='ml-1 text-red-500'>*</span>
                  ) : (
                    ''
                  )}
                </>
              }
              placeHolder='Name'
              labelClass='text-white'
              inputStyle='h-9'
              isEdit={doctorDetails.editDoctorFields}
              message={doctorDetailsError.name}
              status={!doctorDetailsError.name ? 'active' : 'error'}
            />
          </div>

          <div>
            <Input
              handleChange={handleChangeDoctorData}
              name='qualification'
              value={doctorDetails.qualification}
              label={
                <>
                  Qualification
                  {doctorDetails.editDoctorFields ? (
                    <span className='ml-1 text-red-500'>*</span>
                  ) : (
                    ''
                  )}
                </>
              }
              placeHolder='Qualification'
              labelClass='text-white'
              inputStyle='h-9'
              isEdit={doctorDetails.editDoctorFields}
              maxLength={20}
              message={doctorDetailsError.qualification}
              status={!doctorDetailsError.qualification ? 'active' : 'error'}
            />
          </div>

          <div>
            <Input
              handleChange={handleChangeDoctorData}
              name='specializations'
              value={doctorDetails.specializations}
              label='Specializations'
              placeHolder='Specialization'
              labelClass='text-white'
              inputStyle='h-9'
              isEdit={doctorDetails.editDoctorFields}
              maxLength={20}
            />
          </div>

          {doctorDetails.editDoctorFields && (
            <>
              <div>
                <Input
                  handleChange={handleChangeDoctorData}
                  name='password'
                  value={doctorDetails.password}
                  label={
                    <>
                      {doctorViewAddModalType === 'new'
                        ? 'Create Password'
                        : 'Update Password'}

                      {doctorDetails.editDoctorFields ? (
                        <span className='ml-1 text-red-500'>*</span>
                      ) : (
                        ''
                      )}
                    </>
                  }
                  placeHolder={
                    doctorViewAddModalType === 'new'
                      ? 'Create Password'
                      : 'Update Password'
                  }
                  labelClass='text-white'
                  type='password'
                  inputStyle='h-9'
                  message={doctorDetailsError.password}
                  status={!doctorDetailsError.password ? 'active' : 'error'}
                />
              </div>
              <div>
                <Input
                  handleChange={handleChangeDoctorData}
                  name='confirmPassword'
                  value={doctorDetails.confirmPassword}
                  label={
                    <>
                      {doctorViewAddModalType === 'new'
                        ? 'Confirm Password'
                        : 'Confirm Update Password'}
                      {doctorDetails.editDoctorFields ? (
                        <span className='ml-1 text-red-500'>*</span>
                      ) : (
                        ''
                      )}
                    </>
                  }
                  placeHolder={
                    doctorViewAddModalType === 'new'
                      ? 'Confirm Password'
                      : 'Confirm Update Password'
                  }
                  labelClass='text-white'
                  type='password'
                  inputStyle='h-9'
                  isEdit={doctorDetails.editDoctorFields}
                  message={doctorDetailsError.confirmPassword}
                  status={
                    !doctorDetailsError.confirmPassword ? 'active' : 'error'
                  }
                />
              </div>
            </>
          )}

          {doctorViewAddModalType === 'summary' && (
            <div>
              <Input
                value={doctorDetails.password}
                label={
                  <>
                    Password
                    {doctorDetails.editDoctorFields ? (
                      <span className='ml-1 text-red-500'>*</span>
                    ) : (
                      ''
                    )}
                  </>
                }
                labelClass='text-white'
                type='password'
                inputStyle='h-9'
                isEdit={false}
              />
            </div>
          )}

          <div>
            <Input
              handleChange={handleChangeDoctorData}
              name='registrationNumber'
              value={doctorDetails.registrationNumber}
              label={
                <>
                  Registration Number
                  {doctorDetails.editDoctorFields ? (
                    <span className='ml-1 text-red-500'>*</span>
                  ) : (
                    ''
                  )}
                </>
              }
              placeHolder='Registration Number'
              labelClass='text-white'
              inputStyle='h-9'
              isEdit={doctorDetails.editDoctorFields}
              message={doctorDetailsError.registrationNumber}
              status={
                !doctorDetailsError.registrationNumber ? 'active' : 'error'
              }
            />
          </div>
        </div>

        <div className='flex justify-end gap-x-2'>
          {/* <SharedButton
          handleClick={toggleDoctorViewAddModal}
          text="Cancel"
          style="!bg-white text-black"
          name="addDoctor"
        /> */}
          <SharedButton
            handleClick={() => checkAndSubmitDetails()}
            text='Save'
            style='!bg-green-500'
            name='addDoctor'
          />
        </div>
      </div>
    </Modal>
  );
};

export default DoctorViewAddModal;
