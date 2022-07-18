import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedButton from '../button';
import notification from '../../shared/notification';
import getWalletBalance from '../../../client/wallet';
import { Popconfirm } from 'antd';
import ProfileModal from '../profileModal';

export default function Navbar(props) {
  const {
    setUserDetailsActivity,
    setWalletBalanceActivity,
    setSharedLoaderActivity,
  } = props;
  const { userDetails, loader, navbarHeading, walletBalance } = props.state;

  const navigate = useNavigate();

  const [openProfileModal, setOpenProfileModal] = useState(false);

  const toggleOpenProfileModal = () => {
    setOpenProfileModal((pre) => !pre);
  };

  useEffect(() => {
    if (
      !Object.entries(userDetails).length &&
      !sessionStorage?.getItem('bimaxpressBNPL')
    ) {
      window.location.href = '/login';
    }
  }, [userDetails]);

  return (
    <>
      {Object.entries(userDetails).length && (
        <>
          <div className='flex items-center w-full h-16 justify-between bg-baseColor px-2 pt-1'>
            <div className='ml-6 mt-1 '>
              <p className='font-semibold text-white text-xl'>
                {navbarHeading}
              </p>
            </div>

            <div className='flex flex-row justify-center items-center py-4 px-5'>
              <div
                onClick={toggleOpenProfileModal}
                className='flex flex-row items-center cursor-pointer '
              >
                <div className='p-[3.5px] bg-orange bg-opacity-20 rounded '>
                  <div className='w-8 h-8 bg-orange  flex justify-center items-center bg-opacity-80  rounded'>
                    <p className='text-white font-semibold text-lg'>
                      {userDetails?.data?.name[0].toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            <ProfileModal
              openProfileModal={openProfileModal}
              toggleOpenProfileModal={toggleOpenProfileModal}
              userDetails={userDetails}
              setUserDetailsActivity={setUserDetailsActivity}
            />
          }
        </>
      )}
    </>
  );
}
