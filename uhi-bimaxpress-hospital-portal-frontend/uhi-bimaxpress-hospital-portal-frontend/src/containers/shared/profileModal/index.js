import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from './profileModal.module.css';
const ProfileModal = (props) => {
  const {
    openProfileModal,
    toggleOpenProfileModal,
    userDetails,
    setUserDetailsActivity,
  } = props;

  const navigate = useNavigate();

  const logoutUser = () => {
    window.location.href = '/login';
    window.sessionStorage.removeItem('bimaxpressBNPL');
    setUserDetailsActivity({});
  };
  return (
    <Modal
      isOpen={openProfileModal}
      className={`outline-none`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={() => toggleOpenProfileModal()}
      shouldCloseOnOverlayClick={true}
    >
      <div className=' bg-baseColor absolute right-10 top-16 w-64 rounded p-4'>
        <div className='flex flex-col h-full'>
          {/* <img
            src='https://cdn-icons-png.flaticon.com/512/3011/3011270.png'
            alt='user-image'
            className='h-36 w-36 mx-auto m-2'
          /> */}

          <div className='bg-black bg-opacity-60 p-2 rounded'>
            <p className='text-gray-200 text-base font-semibold'>
              {userDetails?.data?.name}
            </p>

            <p className='text-gray-400  text-sm'>{userDetails?.data?.email}</p>
          </div>

          <div className=' text-base font-semibold mt-2 px-2 py-3 border-b border-primary'>
            <button
              onClick={() => {
                navigate(`/userDetails/hospital`);
                toggleOpenProfileModal();
              }}
            >
              <p className='cursor-pointer text-white hover:text-orange'>
                Account Info
              </p>
            </button>
          </div>

          <div className='  text-base font-semibold px-2 py-3 border-b border-primary'>
            <button
              onClick={() => {
                window.open('https://bimaxpress.com/');
                toggleOpenProfileModal();
              }}
            >
              <p className='cursor-pointer text-white hover:text-orange'>
                About Us
              </p>
            </button>
          </div>

          <div className=' text-base font-semibold px-2 py-3 border-b border-primary'>
            <button
              onClick={() => {
                window.open('https://bimaxpress.com/contact');
                toggleOpenProfileModal();
              }}
            >
              <p className='cursor-pointer text-white hover:text-orange'>
                Contact Us
              </p>
            </button>
          </div>

          <div className='  text-base font-semibold px-2 py-3 pb-0'>
            <button onClick={() => logoutUser()}>
              <p className='cursor-pointer text-white hover:text-red-500'>
                Logout
              </p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
