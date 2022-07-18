import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './components/sideBar';
import SharedButton from '../shared/button';
import InputCheckbox from '../shared/inputCheckbox';
import Hospital from './components/hospital';
import Analyst from './components/analyst';
import Doctors from './components/doctors';
import Emailer from './components/emailer';

const Profile = (props) => {
  const { setSharedLoaderActivity, setUserDetailsActivity } = props;
  const { sharedLoader, userDetails } = props.state;

  const params = useParams();

  const renderTab = () => {
    switch (params.category) {
      case 'hospital':
        return <Hospital />;

      case 'analyst':
        return <Analyst />;

      case 'doctors':
        return <Doctors />;

      case 'emailer':
        return <Emailer />;
    }
  };

  return (
    <div className='flex flex-col gap-4 m-5 p-5 h-[calc(100vh+100px)]'>
      <SideBar />
      <div className='rounded bg-black p-5 h-full'>{renderTab()}</div>
    </div>
  );
};

export default Profile;
