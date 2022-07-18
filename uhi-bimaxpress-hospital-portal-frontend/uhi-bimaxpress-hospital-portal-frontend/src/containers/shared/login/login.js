import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notification from '../notification';
import styleScroll from '../../../scrollbar.module.css';
import axios from 'axios';

export default function Login(props) {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { userDetails } = props.state;
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let [loading, setLoading] = useState(false);
  let [hidePass, setHidePass] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  function handleChangeLoginDetails(field) {
    const { name, value } = field.target;
    setLoginDetails((pre) => ({ ...pre, [name]: value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginDetails.email || !loginDetails.password) {
      return notification('warning', 'Email and password is required');
    }
    if (!String(loginDetails.email).toLowerCase().match(regexEmail)) {
      return notification('warning', 'Vaild email is required');
    }

    setSharedLoaderActivity(true);
    try {
      const signInData = await axios.post(
        `${process.env.REACT_APP_HOSPITAL_API}/user/signIn`,
        loginDetails
      );
      setSharedLoaderActivity(false);
      setUserDetailsActivity(signInData.data);

      window.sessionStorage.setItem(
        'bimaxpressBNPL',
        JSON.stringify(signInData.data)
      );

      if (signInData.data.data.active === true) {
        // navigate('/');
        window.location.href = '/';
      }
    } catch (error) {
      setSharedLoaderActivity(false);
      if (error.message === 'Request failed with status code 401') {
        return notification('warning', 'Invaild password');
      }

      if (error.message === 'Request failed with status code 404') {
        return notification('warning', 'Invaild email');
      }

      notification('warning', error.message);
    }
  };

  return (
    <div className={`overflow-x-hidden ${styleScroll.customScroll}`}>
      <div>
        <div
          className={`${
            !loading ? 'hidden' : ''
          } flex items-center justify-center w-screen h-screen absolute z-10`}
        >
          <div className='flex  items-center justify-center h-64 w-64 rounded-full'>
            <img src='/logo.svg'></img>
          </div>
        </div>

        <div className='w-screen flex flex-row overflow-x-hidden'>
          <BigLogo />
          <div className='w-full md:w-1/2  h-screen bg-baseColor p-5 sm:p-10'>
            <div className='text-white font-bold text-lg sm:text-2xl flex justify-start my-6'>
              <span>Sign in to Bimaxpress</span>
            </div>

            <form onSubmit={handleLogin}>
              <div>
                <p className='flex text-white flex-col font-semibold  items-start'>
                  Email Address
                </p>
                <input
                  name='email'
                  placeholder='Enter your email address'
                  className={` outline-none my-4 p-3 w-full text-white  border-0 shadow-none  bg-primary rounded-md`}
                  value={loginDetails.email}
                  onChange={handleChangeLoginDetails}
                ></input>
                <p className='flex flex-col text-white font-semibold items-start'>
                  Password
                </p>
                <div className='flex justify-between outline-none border-0  my-3 w-full shadow-none bg-primary rounded-md'>
                  <input
                    name='password'
                    type={`${hidePass ? 'password' : ''}`}
                    placeholder='Enter your password'
                    className={` outline-none focus:outline-none focus:border-0   text-white focus:shadow-none p-3 w-full bg-primary rounded-md`}
                    value={loginDetails.password}
                    autocomplete='new-password'
                    onChange={handleChangeLoginDetails}
                  ></input>
                  <Link
                    to='/'
                    onClick={(e) => {
                      e.preventDefault();
                      setHidePass(hidePass ? false : true);
                    }}
                    className='flex justify-center text-gray-600 items-center mx-4 outline-none'
                  >
                    <i
                      className={`${!hidePass ? 'hidden' : ''} fas fa-eye`}
                    ></i>
                    <i
                      className={`${hidePass ? 'hidden' : ''} fas fa-eye-slash`}
                    ></i>
                  </Link>
                </div>
              </div>

              <div className='flex justify-start'>
                <button
                  value='Submit'
                  className=' bg-orange hover:opacity-90 outline-none w-full rounded-md p-3 font-semibold my-5 text-white'
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const BigLogo = () => {
  return (
    <div className='hidden sm:visible w-1/2 h-screen bg-black sm:flex justify-center items-center overflow-hidden'>
      <div className='flex flex-col items-center font-semibold text-white'>
        <div>
          <img className=' h-16' src='logo.svg'></img>
        </div>
        <div className=' '>
          {' '}
          <p className='text-center text-xs text-gray-300'>
            Building Confidence in Health <br /> Insurance Management
          </p>
          <div className='absolute text-xs bottom-0 p-5 left-0 flex-col  '>
            <div className='text-xs'>
              Made with Love for{' '}
              <span
                style={{ color: '#fc6203' }}
                className='text-base font-semibold'
              >
                India
              </span>{' '}
            </div>
            <div>
              BimaXpress is by{' '}
              <span className='font-semibold'>RNLP Consulting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
