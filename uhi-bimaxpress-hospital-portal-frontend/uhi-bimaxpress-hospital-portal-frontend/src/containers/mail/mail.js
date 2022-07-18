import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../shared/footer';
import SideBar from './components/sideBar';
import EmailCard from './components/emailCard';
import axios from 'axios';
import notification from '../shared/notification';
import DetailedEmail from './components/detailedEmail';

const Mail = (props) => {
  const { setSharedLoaderActivity, setSelectedMessageActivity } = props;
  const { userDetails, selectedMessage } = props.state;
  const params = useParams();
  const limitEmail = 6;
  const navigate = useNavigate();
  const [totalData, setTotalData] = useState('');
  const [emails, setEmails] = useState([]);
  const [localLoading, setlocalLoading] = useState(false);

  const fetchEmail = async (category) => {
    try {
      setSharedLoaderActivity(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_EMAIL_API}/mail/${category}?email=${userDetails.data.email}&limit=${limitEmail}&pageNumber=${params?.page}`
      );

      setTotalData(data?.totalData);
      setEmails(data?.data?.reverse());
      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  function selectFetchMail() {
    if (params.category === 'inbox') {
      fetchEmail('inboxmails');
      setSelectedMessageActivity('');
    }

    if (params.category === 'sent') {
      fetchEmail('sentMails');
      setSelectedMessageActivity('');
    }
  }

  const refreshMail = () => {
    selectFetchMail();
    navigate(`/mail/${params.category}/1`);
  };

  useEffect(() => {
    if (Object.entries(userDetails).length) {
      selectFetchMail();
    }
  }, [params.category, params.page, userDetails]);

  return (
    <div className='mx-5 rounded-md p-5 px-4 mb-5 min-h-fit bg-black'>
      <SideBar
        setSharedLoaderActivity={setSharedLoaderActivity}
        userDetails={userDetails}
      />

      {
        <div className='grid grid-cols-3 gap-x-6'>
          <div className='pt-2 col-span-1'>
            <EmailCard
              emails={emails}
              setSelectedMessageActivity={setSelectedMessageActivity}
              selectedMessage={selectedMessage}
              refreshMail={refreshMail}
              totalData={totalData}
              limitEmail={limitEmail}
            />
          </div>

          <div className='col-span-2'>
            {selectedMessage.length ? (
              <DetailedEmail
                selectedMessage={selectedMessage}
                setSharedLoaderActivity={setSharedLoaderActivity}
                userDetails={userDetails}
              />
            ) : (
              <div className='flex flex-col rounded-md bg-baseColor min-h-[75vh] justify-center items-center'>
                <img className='w-56' src='/empty.svg'></img>
                <p className='text-white mt-5 border border-gray-600 rounded-full px-3'>
                  Select an E-mail to Preview
                </p>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Mail;
