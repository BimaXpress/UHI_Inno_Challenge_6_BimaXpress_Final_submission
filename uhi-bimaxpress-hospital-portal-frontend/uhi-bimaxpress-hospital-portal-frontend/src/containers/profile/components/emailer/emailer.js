import React from 'react';
import { useState, useEffect } from 'react';
import SharedButton from '../../../shared/button';
import yahooLogo from '../../../../assets/icon/yahooLogo.png';
import googleLogo from '../../../../assets/icon/googleLogo.jpg';
import Input from '../../../shared/input/input';
import InputCheckbox from '../../../shared/inputCheckbox';
import notification from '../../../shared/notification';
import axios from 'axios';

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Emailer = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;

  const [emailerDetails, setEmailerDetails] = useState({
    logger: true,
    email: '',
    password: '',

    //  gmail / yahoo
    service: '',

    // smtp.gmail.com / smtp.mail.yahoo.com
    host: '',

    // gmail - 587, yahoo - 465
    port: '993',
    appPasswordUserCheck: false,
  });

  const [emailerDetailsError, setEmailerDetailsError] = useState({
    service: '',
    email: '',
    password: '',
    appPasswordUserCheck: false,
  });

  const [editEmailer, setEditEmailer] = useState(false);

  const handleChangeEmailerDetails = (field) => {
    const { name, value } = field.target;
    if (name === 'service') {
      let host = '';
      if (value === 'gmail') {
        host = 'smtp.gmail.com';
      }

      if (value === 'yahoo') {
        host = 'smtp.mail.yahoo.com';
      }
      setEmailerDetails((pre) => ({
        ...pre,
        [name]: value,
        host,
      }));
    } else if (name === 'appPasswordUserCheck') {
      setEmailerDetails((pre) => ({
        ...pre,
        [name]: field.target.checked,
      }));
    } else {
      setEmailerDetails((pre) => ({
        ...pre,
        [name]: value,
      }));
      setEmailerDetailsError((pre) => ({ ...pre, [name]: '' }));
    }
  };

  const updateEmailerDetails = async () => {
    try {
      setSharedLoaderActivity(true);
      const updatedData = await axios.put(
        `${process.env.REACT_APP_HOSPITAL_API}/hospital/updateHospital?id=${userDetails.data._id}`,
        { updateData: { emailer: { ...emailerDetails } } }
      );

      setUserDetailsActivity({ ...userDetails, data: updatedData.data.data });
      setEditEmailer(false);
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('warning', error.message);
    }
  };

  const cancelUpdate = () => {
    setEmailerDetailsError({
      service: '',
      email: '',
      password: '',
      appPasswordUserCheck: false,
    });
    setEmailerDetails(userDetails?.data?.emailer);
    setEditEmailer(false);
  };

  const handleCheckDetails = () => {
    console.log('-->', emailerDetails);
    if (emailerDetails.service === '') {
      setEmailerDetailsError((pre) => ({
        ...pre,
        service: 'Choose Mailer Services',
      }));
      return notification('warning', 'Choose Mailer Services');
    }

    if (!String(emailerDetails.email).toLowerCase().match(regexEmail)) {
      setEmailerDetailsError((pre) => ({
        ...pre,
        email: 'Enter a vaild email address',
      }));
      return notification('warning', 'Enter a vaild email address');
    }

    if (emailerDetails.password.length < 4) {
      setEmailerDetailsError((pre) => ({
        ...pre,
        password: 'Enter a vaild password',
      }));
      return notification('warning', 'Enter a vaild password');
    }

    if (emailerDetails.appPasswordUserCheck !== true) {
      setEmailerDetailsError((pre) => ({
        ...pre,
        appPasswordUserCheck: 'Please select App password check',
      }));
      return notification('warning', 'Please select App password check');
    }

    updateEmailerDetails();
  };

  useEffect(() => {
    if (Object.entries(userDetails).length) {
      setEmailerDetails(userDetails?.data?.emailer);
    }
  }, [userDetails]);

  return (
    <div className='flex-col'>
      <div className='flex justify-end space-x-2'>
        {editEmailer ? (
          <>
            <SharedButton
              handleClick={() => cancelUpdate()}
              text={<>Cancel</>}
              style='!bg-white !text-black'
            />
            <SharedButton
              handleClick={() => handleCheckDetails()}
              text={
                <>
                  <i className='fa-solid  fa-floppy-disk mr-1'></i> Save
                </>
              }
            />
          </>
        ) : (
          <SharedButton
            handleClick={() => setEditEmailer(true)}
            text={
              <>
                <i className='fa-solid fa-pen mr-1'></i> Update
              </>
            }
          />
        )}
      </div>
      <div className='flex flex-col md:flex-row w-full gap-x-10'>
        <div className='flex justify-center items-center p-2 w-32 h-32 rounded mt-5 bg-white'>
          <img
            src={emailerDetails.service === 'gmail' ? googleLogo : yahooLogo}
          />
        </div>

        <div className='flex flex-col'>
          {editEmailer && (
            <div>
              <p className='text-white font-semibold'>
                Choose Mailer <span className='text-red-500'>*</span>
              </p>

              <div className='flex gap-x-2 text-gray-300'>
                <button
                  className={`flex rounded p-2 ${
                    emailerDetails.service === 'gmail'
                      ? '!bg-green-500 !bg-opacity-70'
                      : 'bg-gray-700'
                  } hover:bg-gray-500 borderborder-gray-700 text-white font-semibold items-center `}
                  name='service'
                  value='gmail'
                  onClick={handleChangeEmailerDetails}
                >
                  <img
                    src={googleLogo}
                    alt='gmailIcon'
                    className='h-4 mr-2 pointer-events-none'
                  />
                  Gmail
                </button>

                <button
                  className={`flex rounded p-2 ${
                    emailerDetails.service === 'yahoo'
                      ? '!bg-green-500 !bg-opacity-70'
                      : 'bg-gray-700'
                  } hover:bg-gray-500 border border-gray-700 text-white font-semibold items-center `}
                  name='service'
                  value='yahoo'
                  onClick={handleChangeEmailerDetails}
                >
                  <img
                    src={yahooLogo}
                    alt='yahooIcon'
                    className='h-4 mr-2 pointer-events-none'
                  />
                  Yahoo
                </button>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 gap-x-6 min-w-[280px]`}>
            <Input
              handleChange={handleChangeEmailerDetails}
              name='email'
              value={emailerDetails.email}
              label={
                <>
                  Email
                  {editEmailer ? (
                    <span className='ml-1 text-red-500'>*</span>
                  ) : (
                    ''
                  )}
                </>
              }
              placeHolder='Email'
              labelClass='text-white'
              isEdit={editEmailer}
              message={emailerDetailsError.email}
              status={!emailerDetailsError.email ? 'active' : 'error'}
            />

            <Input
              handleChange={handleChangeEmailerDetails}
              name='password'
              value={emailerDetails.password}
              label={
                <>
                  Password (App password)
                  {editEmailer ? (
                    <span className='ml-1 text-red-500'>*</span>
                  ) : (
                    ''
                  )}
                </>
              }
              placeHolder='Password '
              type='password'
              labelClass='text-white'
              isEdit={editEmailer}
              message={emailerDetailsError.password}
              status={!emailerDetailsError.password ? 'active' : 'error'}
            />

            {editEmailer && (
              <InputCheckbox
                handleChange={handleChangeEmailerDetails}
                name='appPasswordUserCheck'
                checkboxLabel='I know how to genrate App Password'
                checkboxLabelStyle='!text-sm'
                checked={emailerDetails.appPasswordUserCheck}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailer;
