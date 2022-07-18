import React, { useEffect, useState, useContext } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import notification from '../shared/notification';
import getWalletBalance from '../../client/wallet';

var loaderAnim = require('../../assets/loader.json');

const UserContext = React.createContext();

export const useAuth = (context) => {
  return useContext(UserContext);
};

export const AuthProvider = (props) => {
  const {
    setSharedLoaderActivity,
    setUserDetailsActivity,
    setWalletBalanceActivity,
    children,
  } = props;
  const { sharedLoader, userDetails, loader } = props.state;
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  const SessionDataDetails = JSON.parse(
    sessionStorage?.getItem('bimaxpressBNPL')
  );

  useEffect(async () => {
    if (SessionDataDetails) {
      setSharedLoaderActivity(true);
      try {
        const hospitalData = await axios.get(
          `${process.env.REACT_APP_HOSPITAL_API}/hospital/getHospitals?_id=${SessionDataDetails?.data?._id}`
        );
        console.log('hospitalData .... ', hospitalData.data.data[0]);
        setUserDetailsActivity({
          data: hospitalData.data.data[0],
          token: {
            accessToken: SessionDataDetails.token.accessToken,
            refreshToken: SessionDataDetails.token.refreshToken,
          },
        });
        setSharedLoaderActivity(false);
      } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        console.log(errorObject.data.error.message);

        setSharedLoaderActivity(false);
        notification('error', errorObject.data.error.message);
      }
    }
  }, []);

  useEffect(() => {
    getWalletBalance(
      userDetails.data,
      setSharedLoaderActivity,
      setWalletBalanceActivity
    );
  }, [userDetails]);

  if (loader) {
    return (
      <div className='flex items-center bg-black justify-center w-screen h-screen absolute z-10'>
        <div className='flex items-center justify-center h-64 w-64 rounded-full'>
          <Lottie options={defaultOptions} height={350} width={350} />
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userDetails: userDetails }}>
      {!loader && children}
    </UserContext.Provider>
  );
};
