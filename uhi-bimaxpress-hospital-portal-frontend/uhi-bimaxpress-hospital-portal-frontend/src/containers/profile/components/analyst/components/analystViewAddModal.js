import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './analystViewAddModal.module.css';
import Input from '../../../../shared/input/input';
import SharedButton from '../../../../shared/button';
import notification from '../../../../shared/notification';
import axios from 'axios';

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AnalystViewAddModal = (props) => {
  const {
    openAnalystModal,
    toggleAnalystModal,
    selctedAnalyst,
    analystModalType,
    userDetails,
    setSharedLoaderActivity,
    setAnalystModalType,
    fetchAnalyst,
  } = props;

  const [analystDetails, setAnalystDetails] = useState({
    name: '',
    email: '',
    employeeID: '',
    contactNumber: 0,
    password: '',
    confirmPassword: '',
  });

  const [analystDetailsError, setAnalystDetailsError] = useState({
    name: '',
    email: '',
    employeeID: '',
    contactNumber: 0,
    password: '',
    confirmPassword: '',
  });

  const [editAnalystFields, setEditAnalystFields] = useState(true);

  const handleChangeAnalystDetsils = (field) => {
    const { name, value } = field.target;
    setAnalystDetails((pre) => ({ ...pre, [name]: value }));

    setAnalystDetailsError((pre) => ({ ...pre, [name]: '' }));

    if (name === 'password' || name === 'confirmPassword') {
      setAnalystDetailsError((pre) => ({
        ...pre,
        password: '',
        confirmPassword: '',
      }));
    }
  };

  useEffect(() => {
    switch (analystModalType) {
      case 'summary':
        setAnalystDetails({
          ...selctedAnalyst,
          password: selctedAnalyst.originalPassword,
          confirmPassword: selctedAnalyst.originalPassword,
        });
        setEditAnalystFields(false);
        break;

      case 'update':
        setEditAnalystFields(true);
        break;

      case 'new':
        setAnalystDetails({
          name: '',
          email: '',
          employeeID: '',
          contactNumber: 0,
          password: '',
          confirmPassword: '',
        });
        break;
    }
  }, [analystModalType]);

  const deleteAnalyst = async () => {
    try {
      setSharedLoaderActivity(true);

      await axios.delete(
        `${process.env.REACT_APP_HOSPITAL_API}/analyst/deleteAnalyst?hospitalId=${userDetails?.data?._id}&id=${selctedAnalyst._id}`
      );
      fetchAnalyst();
      toggleAnalystModal();
      notification('info', 'Successfully Deleted!');
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const updateAnalystData = async () => {
    setSharedLoaderActivity(true);
    try {
      if (analystModalType === 'new') {
        await axios.post(
          `${process.env.REACT_APP_HOSPITAL_API}/analyst/registerAnalyst?hospitalId=${userDetails.data._id}`,
          analystDetails
        );
      }
      if (analystModalType === 'update') {
        await axios.put(
          `${process.env.REACT_APP_HOSPITAL_API}/analyst/updateAnalyst?id=${selctedAnalyst._id}`,
          analystDetails
        );
      }

      fetchAnalyst();

      setSharedLoaderActivity(false);
      toggleAnalystModal();
      notification(
        'success',
        `Case Has been successfully ${
          analystModalType === 'new' ? 'Created' : 'Updated'
        }`
      );
    } catch (error) {
      setSharedLoaderActivity(false);
      if (
        JSON.parse(error?.request?.responseText)
          ?.error?.message?.split(' ')
          .slice(-1)[0] === 'present'
      ) {
        notification('info', `Email already present!`);
      } else {
        notification('error', error.message);
      }
    }
  };

  const checkAndSubmit = () => {
    if (analystDetails.name.length < 4) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        name: 'Vaild Name is Required',
      }));
      return notification('warning', 'Vaild Name is Required');
    }

    if (!String(analystDetails.email).toLowerCase().match(regexEmail)) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        email: 'Vaild Email is Required',
      }));
      return notification('warning', 'Vaild email is Required');
    }

    if (analystDetails.employeeID.length < 4) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        employeeID: 'Vaild Employee ID is Required',
      }));
      return notification('warning', 'Vaild Employee ID is Required');
    }

    if (String(analystDetails?.contactNumber).length !== 10) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        contactNumber: 'Vaild Contact Number is Required',
      }));
      return notification('warning', 'Vaild Contact Number is Required');
    }

    if (
      analystDetails.password.length < 6 ||
      analystDetails.password.includes(' ')
    ) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        password: 'Invaild password',
      }));
      return notification('warning', 'Enter 6 characters of vaild password');
    }

    if (analystDetails.password !== analystDetails.confirmPassword) {
      setAnalystDetailsError((pre) => ({
        ...pre,
        password: 'Password does not match',
        confirmPassword: 'Password does not match',
      }));
      return notification('warning', 'Password does not match');
    }

    updateAnalystData();
  };
  return (
    <Modal
      isOpen={openAnalystModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleAnalystModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleAnalystModal}
        />
        <p className='text-white text-2xl'>
          {analystModalType === 'summary'
            ? 'Analyst Summary'
            : analystModalType === 'new'
            ? 'Create Claim Analyst'
            : analystModalType === 'update'
            ? 'Update Claim Analyst'
            : ''}
        </p>

        <div className='flex justify-end gap-x-2'>
          {analystModalType === 'summary' && (
            <SharedButton
              handleClick={() => setAnalystModalType('update')}
              style='!bg-white !text-black'
              text={
                <>
                  <i className='fa-solid fa-pen mr-1' />
                  Edit
                </>
              }
            />
          )}

          {(analystModalType === 'summary' ||
            analystModalType === 'update') && (
            <SharedButton
              handleClick={() => deleteAnalyst()}
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
          <Input
            handleChange={handleChangeAnalystDetsils}
            name='email'
            value={analystDetails.email}
            label={
              <>
                Email
                {editAnalystFields ? (
                  <span className='ml-1 text-red-500'>*</span>
                ) : (
                  ''
                )}
              </>
            }
            placeHolder='Email'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={editAnalystFields && analystModalType === 'new'}
            message={analystDetailsError.email}
            status={!analystDetailsError.email ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeAnalystDetsils}
            name='name'
            value={analystDetails.name}
            label={
              <>
                Name
                {editAnalystFields ? (
                  <span className='ml-1 text-red-500'>*</span>
                ) : (
                  ''
                )}
              </>
            }
            placeHolder='Name'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={editAnalystFields}
            message={analystDetailsError.name}
            status={!analystDetailsError.name ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeAnalystDetsils}
            name='employeeID'
            value={analystDetails.employeeID}
            label={
              <>
                Employee ID
                {editAnalystFields ? (
                  <span className='ml-1 text-red-500'>*</span>
                ) : (
                  ''
                )}
              </>
            }
            placeHolder='Employee ID'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={editAnalystFields}
            message={analystDetailsError.employeeID}
            status={!analystDetailsError.employeeID ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeAnalystDetsils}
            name='contactNumber'
            value={analystDetails.contactNumber || ''}
            label={
              <>
                Contact Number
                {editAnalystFields ? (
                  <span className='ml-1 text-red-500'>*</span>
                ) : (
                  ''
                )}
              </>
            }
            placeHolder='Contact Number'
            labelClass='text-white'
            inputStyle='h-9'
            type='Number'
            maxLength='10'
            isEdit={editAnalystFields}
            message={analystDetailsError.contactNumber}
            status={!analystDetailsError.contactNumber ? 'active' : 'error'}
          />

          {(analystModalType === 'update' || analystModalType === 'new') && (
            <>
              <Input
                handleChange={handleChangeAnalystDetsils}
                name='password'
                value={analystDetails.password}
                label={
                  <>
                    {analystModalType === 'new'
                      ? 'Create Password'
                      : 'Update Password'}

                    {editAnalystFields ? (
                      <span className='ml-1 text-red-500'>*</span>
                    ) : (
                      ''
                    )}
                  </>
                }
                placeHolder={
                  analystModalType === 'new'
                    ? 'Create Password'
                    : 'Update Password'
                }
                labelClass='text-white'
                inputStyle='h-9'
                type='password'
                isEdit={editAnalystFields}
                message={analystDetailsError.password}
                status={!analystDetailsError.password ? 'active' : 'error'}
              />

              <Input
                handleChange={handleChangeAnalystDetsils}
                name='confirmPassword'
                value={analystDetails.confirmPassword}
                label={
                  <>
                    {analystModalType === 'new'
                      ? 'Confirm Password'
                      : 'Confirm Update Password'}

                    {editAnalystFields ? (
                      <span className='ml-1 text-red-500'>*</span>
                    ) : (
                      ''
                    )}
                  </>
                }
                placeHolder={
                  analystModalType === 'new'
                    ? 'Confirm Password'
                    : 'Confirm Update Password'
                }
                labelClass='text-white'
                inputStyle='h-9'
                type='password'
                isEdit={editAnalystFields}
                message={analystDetailsError.confirmPassword}
                status={
                  !analystDetailsError.confirmPassword ? 'active' : 'error'
                }
              />
            </>
          )}

          {analystModalType === 'summary' && (
            <Input
              name='password'
              value={analystDetails.originalPassword}
              label={<> Password</>}
              labelClass='text-white'
              inputStyle='h-9'
              type='password'
              isEdit={false}
            />
          )}
        </div>

        {(analystModalType === 'new' || analystModalType === 'update') && (
          <div className='flex justify-end gap-x-2 mt-2'>
            {/* <SharedButton
              handleClick={toggleAnalystModal}
              text='Cancel'
              style='!bg-white text-black'
              name='cancel'
            /> */}
            <SharedButton
              handleClick={() => checkAndSubmit()}
              text='Save'
              style='!bg-green-500'
              name='addAnalyst'
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AnalystViewAddModal;
