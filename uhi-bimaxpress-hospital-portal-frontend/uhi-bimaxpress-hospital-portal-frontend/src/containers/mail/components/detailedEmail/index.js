import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SharedButton from '../../../shared/button';
import ReactHtmlParser from 'react-html-parser';
import fileDownload from 'js-file-download';
import { Tooltip } from 'antd';
import format from 'date-fns/format';
import SendMailModal from '../sendMailModal';
import axios from 'axios';
import notification from '../../../shared/notification';
import SquareLoadingSvg from '../../../shared/squareLoadingSvg';

const DetailedEmail = (props) => {
  const param = useParams();
  const { selectedMessage, setSharedLoaderActivity, userDetails } = props;
  const [detailEmail, setDetailEmail] = useState({});
  const [localLoader, setLocalLoader] = useState(false);
  const [openSendMailModal, setOpenSendMailModal] = useState(false);
  const [actionType, setActionType] = useState('');

  const tooggleOpenSendMailModal = () => {
    setOpenSendMailModal((pre) => !pre);
  };

  const handleReplyFwd = (type) => {
    if (type === 'Reply') {
      setActionType('Reply');
    }

    if (type === 'Forward') {
      setActionType('Forward');
    }
    tooggleOpenSendMailModal();
  };

  const openDownload = (field, data, type, fileName) => {
    const arr = new Uint8Array(data);
    const blob = new Blob([arr], {
      type: type,
    });

    const fileURL = URL.createObjectURL(blob);
    if (field.target.className === 'fa-solid fa-download') {
      fileDownload(blob, fileName);
    } else {
      window.open(fileURL);
    }
  };

  const fetchDetailedEmail = async () => {
    try {
      setSharedLoaderActivity(true);
      setLocalLoader(true);

      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_EMAIL_API}/mail/getMailByID`,
        {
          params: {
            email: userDetails.data.email,
            messageId: encodeURIComponent(selectedMessage),
            category: param?.category === 'inbox' ? 'INBOX' : 'SENT',
          },
        }
      );

      setDetailEmail(data[0]);
      setLocalLoader(false);
      setSharedLoaderActivity(false);
    } catch (error) {
      console.log(error.response.data.error.message);
      setLocalLoader(false);
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  useEffect(() => {
    if (selectedMessage.length) {
      fetchDetailedEmail();
    }
  }, [selectedMessage]);

  return (
    <>
      {localLoader && (
        <div className='flex flex-col items-center justify-center h-[80vh] bg-baseColor rounded-md'>
          <SquareLoadingSvg color='orange' height='50' width='50' />
          <span className='text-white ml-1.5'>Loading Email...</span>
        </div>
      )}

      {!localLoader && (
        <div className='bg-gray-200 rounded p-4 min-h-[90vh] overflow-x-auto mt-12'>
          <div className='flex justify-end gap-x-4 mr-2'>
            <span className='pt-[1px] font-semibold'>
              {detailEmail?.date &&
                format(new Date(detailEmail?.date), 'dd MMM yy, hh:mm aa')}
            </span>
            <Tooltip placement='bottom' title={'Reply'}>
              <button
                onClick={() => {
                  handleReplyFwd('Reply');
                }}
              >
                <i className='fa-solid fa-reply text-lg' />
              </button>
            </Tooltip>

            <Tooltip placement='bottom' title={'Forward'}>
              <button
                onClick={() => {
                  handleReplyFwd('Forward');
                }}
              >
                <i className='fa-solid fa-share text-lg' />
              </button>
            </Tooltip>

            <Tooltip placement='bottom' title={'Delete'}>
              <button>
                <i className='fa-solid fa-trash text-lg' />
              </button>
            </Tooltip>
          </div>
          <div>
            <p className='text-xl font-semibold'>
              {param.category === 'inbox' ? detailEmail.name : detailEmail.to}
            </p>

            <p className='text-xs'>
              <span className='font-semibold'>To:</span> {detailEmail.to}
            </p>
            <p className='text-xs mb-5'>
              <span className='font-semibold'>From:</span> {detailEmail.from}
            </p>
            <p className='text-2xl font-semibold'>{detailEmail.subject}</p>
          </div>
          {ReactHtmlParser(detailEmail.textAsHtml)}
          {console.log(detailEmail)}
          {detailEmail?.attachments?.length ? (
            <div className='mt-2'>
              <p className='text-xl font-semibold select-none'>Attachments :</p>

              <div className='flex p-2 gap-2 flex-wrap'>
                {detailEmail?.attachments.map((attatchment, index) => {
                  return (
                    <Tooltip placement='bottom' title={attatchment.filename}>
                      <div
                        className='flex w-36 p-2 rounded bg-gray-300 cursor-pointer justify-between items-center'
                        onClick={(e) =>
                          openDownload(
                            e,
                            attatchment.content.data,
                            attatchment.contentType,
                            attatchment.filename
                          )
                        }
                      >
                        <span className='select-none w-[100px] h-6 overflow-hidden pointer-events-none'>
                          {attatchment?.filename}
                        </span>
                        <i
                          className='fa-solid fa-download'
                          name='downloadIcon'
                        />
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {openSendMailModal && (
        <SendMailModal
          openSendMailModal={openSendMailModal}
          tooggleOpenSendMailModal={tooggleOpenSendMailModal}
          setSharedLoaderActivity={setSharedLoaderActivity}
          userDetails={userDetails}
          type={actionType}
          selectedMessage={detailEmail}
        />
      )}
    </>
  );
};

export default DetailedEmail;
