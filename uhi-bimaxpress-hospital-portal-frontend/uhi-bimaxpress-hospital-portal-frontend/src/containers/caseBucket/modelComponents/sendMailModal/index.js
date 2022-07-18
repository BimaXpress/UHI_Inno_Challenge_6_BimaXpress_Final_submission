import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './sendMailModal.module.css';
import SharedButton from '../../../shared/button';
import { format } from 'date-fns';
import fileDownload from 'js-file-download';
import axios from 'axios';
import notification from '../../../shared/notification';
import bold from '../../../../assets/icon/bold.svg';
import italic from '../../../../assets/icon/italic.svg';
import underline from '../../../../assets/icon/underline.svg';
import align_center_alt from '../../../../assets/icon/align-center-alt.svg';
import align_left from '../../../../assets/icon/align_left.svg';
import align_right from '../../../../assets/icon/align_right.svg';
import { MdOutlineClose } from 'react-icons/md';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import paperclip_black from '../../../../assets/icon/paperclip_black.svg';
import { FiPaperclip } from 'react-icons/fi';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

const SendMailModal = (props) => {
  const {
    openSendMailModal,
    toggleSentMailModal,
    setSharedLoaderActivity,
    summaryData,
    selectedAction,
    userDetails,
  } = props;

  const [mail, setMail] = useState({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    file: [],
  });

  const bodyRef = useRef(null);

  const navigate = useNavigate();

  const runCommand = (command) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e) => {
    const { name, value, type } = e?.target;
    console.log(type);

    if (value !== ',') {
      if (type === 'file') {
        setMail((pre) => ({
          ...pre,

          [name]: [...pre[name], ...e?.target?.files],
        }));
      } else {
        setMail((pre) => ({ ...pre, [name]: value }));
      }
    }
  };

  const handleKeypress = (e, name, listName) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      if (mail[name]) {
        setMail((pre) => ({
          ...pre,

          [listName]: [...pre[listName], pre[name]],
          [name]: '',
        }));
      }
    }
  };

  const removeEmail = (val, listName) => {
    setMail((pre) => ({
      ...pre,
      [listName]: [...pre[listName]]?.filter((mail) => mail !== val),
    }));
  };

  const removeImage = (name) => {
    setMail((pre) => ({
      ...pre,
      //@ts-ignore
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const checkValidEmail = (val) => {
    return emailRegex?.test(val);
  };

  const sendMail = async () => {
    // return console.log('This is mail data', mail);
    const mailData = new FormData();
    // mailData.append('to', mail.to);
    mailData.append('to', 'ishanindraniya@gmail.com');
    mail?.ccList?.length &&
      mail?.ccList?.forEach((mail) => {
        mailData.append('cc', mail);
      });
    mailData.append('sub', mail?.sub);
    mailData.append('text', bodyRef?.current?.innerText);
    mail?.file?.length &&
      mail?.file?.map((file) => mailData.append('attachments', file));

    const formStatus = new FormData();
    formStatus.append('caseId', summaryData?._id);
    formStatus.append('formStatus', 'Query');
    formStatus.append('summary', 'Query');
    formStatus.append('action', 'Query');

    if (mail?.file.length === 1) {
      mail?.file?.forEach((img) => {
        formStatus.append('fileName[0]', img?.name);
        formStatus.append('uploadFiles', img);
      });
    } else {
      mail?.file?.forEach((img) => {
        formStatus.append('fileName', img?.name);
        formStatus.append('uploadFiles', img);
      });
    }

    formStatus.append(
      'folderName',
      `Hospital/${summaryData?.hospitalDetails?.email}/${summaryData?._id}`
    );

    setSharedLoaderActivity(true);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_EMAIL_API}/mail/sendMail?email=${userDetails?.data?.emailer?.email}`,
        mailData
      );

      //   //message Change Form Status
      const changeStatus = await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );

      setSharedLoaderActivity(false);
      notification('success', 'Mail Sent Successfully');
      notification('success', `Case moved ${selectedAction} successfully`);
      navigate('/');
    } catch (e) {
      setSharedLoaderActivity(false);
      notification('error', e?.message);
    }
  };

  useEffect(() => {
    setMail((pre) => ({
      ...pre,
      to: '',
      cc: '',
      bcc: '',
      ccList: [],
      bccList: [],
      sub: `Query Reply for ${summaryData?.patientDetails?.name} Claim Number: ${summaryData?.claimNo}`,
      file: [],
      toList: [],
      body: `Dear Sir/Ma'am, <br>
                Please find query response for ${
                  summaryData?.patientDetails?.name
                } admitted on ${format(
        new Date(summaryData?.hospitalDetails?.dateOfAdmission),
        'd LLL Y hh:mm a'
      )}. <br><br>
                Also find details of patient below: <br>
                &emsp; Patient name: ${summaryData?.patientDetails?.name} <br>
                &emsp; Date of admission : ${format(
                  new Date(summaryData?.hospitalDetails?.dateOfAdmission),
                  'd LLL Y'
                )} <br>
                &emsp; Policy Number : ${
                  summaryData?.patientDetails?.policyNumber
                } <br> <br>
                Please find the attached documents below following to the raised query. <br>`,
    }));
  }, []);

  return (
    <>
      <Modal
        isOpen={openSendMailModal}
        className={`${styles.approveModalContainer} y-scroll`}
        overlayClassName={styles.overlayContainer}
        onRequestClose={toggleSentMailModal}
        shouldCloseOnOverlayClick={true}
      >
        <div
          className={`flex items-center justify-between py-3 w-full px-4 border-none outline-none ${styles.composeModalHeader}`}
        >
          <p className='text-base  tracking-wide capitalize text-black font-semibold'>
            Sent Mail
          </p>

          <IoClose
            className='w-5 h-5 p-1 bg-red-500 rounded-full  text text-white cursor-pointer'
            onClick={toggleSentMailModal}
          />
        </div>

        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap'>
          <p className='mr-2 mb-1'>Cc</p>
          {mail?.ccList?.map((item, index) => {
            return (
              <div
                className={`flex items-center border border-fontColor-darkGray rounded-3xl mr-2 px-2 mb-1  ${
                  checkValidEmail(item)
                    ? 'font-medium text-primary'
                    : 'border-none bg-red-600 text-fontColor'
                }`}
                key={index}
              >
                <p>{item}</p>
                <MdOutlineClose
                  className={`text-fontColor-darkGray ml-2 cursor-pointer ${
                    checkValidEmail(item) ? '' : 'text-fontColor'
                  }`}
                  onClick={() => removeEmail(item, 'ccList')}
                />
              </div>
            );
          })}

          <input
            className='border-none outline-none flex-auto'
            value={mail?.cc}
            name='cc'
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeypress(e, 'cc', 'ccList')}
          />
        </div>
        <div className='px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex'>
          <input
            className='border-none outline-none text-primary font-medium flex-auto'
            value={mail?.sub}
            name='sub'
            onChange={(e) => handleChange(e)}
            placeholder='Subject'
          />
        </div>

        <div
          className='px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none'
          style={{ height: '250px', overflowY: 'scroll' }}
          contentEditable={true}
          ref={bodyRef}
          suppressContentEditableWarning={true}
        >
          {ReactHtmlParser(mail?.body)}
          {/* <p>{mail?.body}</p> */}
        </div>

        <div className='flex items-center flex-wrap'>
          {mail?.file?.length
            ? mail?.file?.map((file, index) => {
                return (
                  <div
                    className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden '
                    style={{ width: '100%', maxWidth: '145px' }}
                    key={index}
                  >
                    <p
                      style={{
                        width: '100%',
                        maxWidth: '125px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {/* @ts-ignore */}
                      {file?.name}
                    </p>
                    {/* @ts-ignore */}
                    <IoClose onClick={() => removeImage(file?.name)} />
                  </div>
                );
              })
            : null}
        </div>
        <div className='flex items-center py-8 p px-4'>
          <SharedButton
            style='mr-2 bg-green-500'
            handleClick={sendMail}
            text='Send'
          />
          <div className='relative w-8 h-8 cursor-pointer'>
            <img
              src={paperclip_black}
              alt='icon'
              className='absolute mr-3 top-2 cursor-pointer'
            />
            <input
              type='file'
              multiple
              className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 '
              name='file'
              onChange={handleChange}
            />
          </div>
          <div
            className='flex items-center p-3 rounded'
            style={{ backgroundColor: '#EEEEEE' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={bold}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('bold')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={italic}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('italic')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={underline}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('underline')}
              onMouseDown={(e) => e.preventDefault()}
            />

            <img
              src={align_right}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyLeft')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_center_alt}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyCenter')}
              onMouseDown={(e) => e.preventDefault()}
            />
            <img
              src={align_left}
              alt='icon'
              className='mr-3 cursor-pointer'
              onClick={() => runCommand('justifyRight')}
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SendMailModal;
