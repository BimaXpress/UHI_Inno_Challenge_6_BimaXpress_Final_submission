import { tab } from '@testing-library/user-event/dist/tab';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SendMailModal from '../sendMailModal';
import React from 'react';

const SideBar = (props) => {
  const { setSharedLoaderActivity, userDetails } = props;
  const navigate = useNavigate();
  const params = useParams();

  const [openSendMailModal, setOpenSendMailModal] = useState(false);
  const tooggleOpenSendMailModal = () => {
    setOpenSendMailModal((pre) => !pre);
  };

  const tabs = [
    { name: 'Inbox', icon: 'fa-solid fa-inbox' },
    { name: 'Sent', icon: 'fa-solid fa-paper-plane' },
    { name: 'Compose', icon: 'fa-solid fa-plus' },
  ];

  const handleOpenCategory = (name) => {
    if (name === 'Compose') {
      tooggleOpenSendMailModal();
    } else {
      navigate(`/mail/${name.toLowerCase()}/1`);
    }
  };

  return (
    <>
      <div className='flex flex-row gap-x-2'>
        {tabs.map((item) => {
          return (
            <button
              key={item.name}
              className={` rounded py-1 pl-2 sm:p-2 sm:pl-4 text-white text-left ${
                params.category == item.name.toLowerCase()
                  ? 'bg-orange hover:bg-opacity-90'
                  : 'bg-gray-400 bg-opacity-30 hover:bg-opacity-40'
              }`}
              onClick={() => handleOpenCategory(item.name)}
            >
              <i className={item.icon}></i>
              <span className='mx-2 text-base font-semibold visible sm:visible '>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
      {openSendMailModal && (
        <SendMailModal
          openSendMailModal={openSendMailModal}
          tooggleOpenSendMailModal={tooggleOpenSendMailModal}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
          type='Compose'
        />
      )}
    </>
  );
};

export default SideBar;
