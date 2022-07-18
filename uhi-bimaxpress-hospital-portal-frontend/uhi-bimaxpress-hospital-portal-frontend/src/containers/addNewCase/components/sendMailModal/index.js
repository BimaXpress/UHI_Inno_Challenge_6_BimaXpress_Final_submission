import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './sendMailModal.module.css';
import SharedButton from '../../../shared/button';
import { format } from 'date-fns';
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
// import paperclip from "../../../assets/icon/paperclip.svg";
import { FiPaperclip } from 'react-icons/fi';

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

const SendMailModal = ({
  openSendMailModal,
  toggleOpenSendMailModal,
  patientDetails,
  hospitalDetails,
  companyDetails,
  setSharedLoaderActivity,
  caseId,
  totalCost,
  userDetails,
}) => {
  const [mail, setMail] = useState({
    to: '',
    cc: '',
    bcc: '',
    toList: [],
    ccList: [],
    bccList: [],
    sub: '',
    body: '',
    // file: [],
    UrluploadPatientsHealthIDCard: [],
    Urlidproof: [],
    UrluploadConsultation: [],
    UrluploadSignedPreAuth: [],
    UrlotherDocuments: [],
  });

  const bodyRef = useRef(null);

  const navigate = useNavigate();

  const removeImage = (name, listName) => {
    setMail((pre) => ({
      ...pre,

      [listName]: [...pre[listName]]?.filter((files) => files?.name !== name),
    }));
  };

  const runCommand = (command) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e) => {
    const { name, value, type } = e?.target;

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

  const checkValidEmail = (val) => {
    return emailRegex?.test(val);
  };

  useEffect(() => {
    setMail((pre) => ({
      ...pre,
      to: '',
      cc: '',
      bcc: '',
      ccList: [],
      bccList: [],
      sub: `Pre-authorization request for ${patientDetails?.name} ${patientDetails?.healthId}/${patientDetails?.policyNumber}`,
      file: [],
      toList: [],
      body: `Dear Sir/Ma'am, <br>
      Please find pre auth request for ${
        patientDetails?.name
      } admitted on ${format(
        new Date(hospitalDetails?.dateOfAdmission),
        'd LLL Y hh:mm a'
      )}. <br><br>
      Also find details of patient below: <br>
      &emsp; Patient name: ${patientDetails?.name} <br>
      &emsp; Date of admission : ${format(
        new Date(hospitalDetails?.dateOfAdmission),
        'd LLL Y'
      )} <br>
      &emsp; Health-id card no : ${patientDetails?.healthId} <br> <br>
      Please find the attached preauth documents below. <br>`,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMail = async () => {
    const mailData = new FormData();
    // mailData.append(
    //   'to',
    //   companyDetails?.tpaCompany
    //     ? companyDetails?.tpaCompanyEmail
    //     : companyDetails?.insuranceCompanyEmail
    // );

    mailData.append('to', 'ishanindraniya@gmail.com');
    mail?.ccList?.length &&
      mail?.ccList?.forEach((mail) => {
        mailData.append('cc', mail);
      });
    mailData.append('sub', mail?.sub);
    mailData.append('text', bodyRef?.current?.innerText);

    mail?.UrluploadPatientsHealthIDCard.forEach((file) => {
      mailData.append('attachments', file);
    });

    mail?.Urlidproof.forEach((file) => {
      mailData.append('attachments', file);
    });

    mail?.UrluploadConsultation.forEach((file) => {
      mailData.append('attachments', file);
    });

    mail?.UrluploadSignedPreAuth.forEach((file) => {
      mailData.append('attachments', file);
    });

    mail?.UrlotherDocuments.forEach((file) => {
      mailData.append('attachments', file);
    });

    const formStatus = new FormData();
    formStatus.append('caseId', caseId);
    formStatus.append('formStatus', 'Unprocess');
    formStatus.append('summary', 'Unprocessed');
    formStatus.append('amount', totalCost);
    formStatus.append('action', 'Unprocessed');
    const allAttachments = [];

    allAttachments.push(...mail?.UrluploadPatientsHealthIDCard);
    allAttachments.push(...mail?.Urlidproof);
    allAttachments.push(...mail?.UrluploadConsultation);
    allAttachments.push(...mail?.UrluploadSignedPreAuth);
    allAttachments.push(...mail?.UrlotherDocuments);

    allAttachments.forEach((attachment) =>
      formStatus.append('uploadFiles', attachment)
    );

    formStatus.append(
      'folderName',
      `Hospital/${hospitalDetails?.email}/${caseId}`
    );
    if (allAttachments.length === 1) {
      formStatus.append('fileName[0]', allAttachments[0].name);
    }
    if (allAttachments.length > 1) {
      allAttachments.forEach((file) =>
        formStatus.append('fileName', file.name)
      );
    }

    setSharedLoaderActivity(true);
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_EMAIL_API}/mail/sendMail?email=${userDetails?.data?.emailer?.email}`,
        mailData
      );

      //! Change Form Status ===================

      const changeStatus = await axios.put(
        `${process.env.REACT_APP_CASE_API}/case/changeFormStatus`,
        formStatus
      );

      setSharedLoaderActivity(false);
      navigate('/');
      notification('success', 'Mail Sent Successfully');
    } catch (e) {
      setSharedLoaderActivity(false);
      notification('error', e?.message);
    }
  };

  return (
    <>
      <Modal
        isOpen={openSendMailModal}
        className={`${styles.approveModalContainer} overflow-y-auto overflow-x-hidden  max-h-[500px]`}
        overlayClassName={styles.overlayContainer}
        onRequestClose={toggleOpenSendMailModal}
        shouldCloseOnOverlayClick={true}
      >
        <div
          className={`flex items-center justify-between  bg-white px-4 border-none outline-none ${styles.composeModalHeader}`}
        >
          <div></div>
          <p className='text-base text-black font-bold p-2 tracking-wide capitalize'>
            Sent Mail
          </p>
          <IoClose
            className=' text-2xl text-white bg-red-600 p-1 rounded-full  cursor-pointer'
            onClick={toggleOpenSendMailModal}
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
          contentEditable={true}
          ref={bodyRef}
          suppressContentEditableWarning={true}
        >
          {ReactHtmlParser(mail?.body)}
          {/* <p>{mail?.body}</p> */}
        </div>

        <div className='grid grid-cols-2 gap-x-4 gap-y-6 p-4'>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadSignedPreAuth?.length
                ? mail?.UrluploadSignedPreAuth?.map((file, index) => {
                    return (
                      <div
                        className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
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

                        <IoClose
                          onClick={() =>
                            removeImage(file?.name, 'UrluploadSignedPreAuth')
                          }
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
              style={{ minWidth: '150px' }}
            >
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Auth Form
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadSignedPreAuth'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadConsultation?.length
                ? mail?.UrluploadConsultation?.map((file, index) => {
                    return (
                      <div
                        className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
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
                        <IoClose
                          onClick={() =>
                            removeImage(file?.name, 'UrluploadConsultation')
                          }
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
              style={{ minWidth: '150px' }}
            >
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Consultation Papers
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadConsultation'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrluploadPatientsHealthIDCard?.length
                ? mail?.UrluploadPatientsHealthIDCard?.map((file, index) => {
                    return (
                      <div
                        className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
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
                        <IoClose
                          onClick={() =>
                            removeImage(
                              file?.name,
                              'UrluploadPatientsHealthIDCard'
                            )
                          }
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
              style={{ minWidth: '150px' }}
            >
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Health Id Card
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrluploadPatientsHealthIDCard'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.Urlidproof?.length
                ? mail?.Urlidproof?.map((file, index) => {
                    return (
                      <div
                        className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
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

                        <IoClose
                          //@ts-ignore
                          onClick={() => removeImage(file?.name, 'Urlidproof')}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
              style={{ minWidth: '150px' }}
            >
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                ID Proof
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='Urlidproof'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
          <div className='col-span-1 flex justify-center flex-col'>
            <div className='flex items-center flex-wrap'>
              {mail?.UrlotherDocuments?.length
                ? mail?.UrlotherDocuments?.map((file, index) => {
                    return (
                      <div
                        className='bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm m-4 overflow-hidden '
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

                        <IoClose
                          onClick={() =>
                            //@ts-ignore
                            removeImage(file?.name, 'UrlotherDocuments')
                          }
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className='relative flex items-center justify-center border-2 border-fontColor-darkGray rounded-lg  h-10 px-2'
              style={{ minWidth: '150px' }}
            >
              <FiPaperclip className='mr-2' />
              <p className='text-fborder-fontColor-darkGray-gray font-normal '>
                Other Documents
              </p>
              <input
                type='file'
                className='absolute border-none outline-none cursor-pointer opacity-0 w-full h-10 top-0 left-0 z-10'
                name='UrlotherDocuments'
                onChange={handleChange}
                multiple
              />
            </div>
          </div>
        </div>
        <div className=' flex items-center py-8 p px-4'>
          {/* <button
            className='w-28 h-10 bg-primary-dark text-sm text-fontColor border-none outline-none rounded mr-3'
          >
            Send
          </button> */}
          <SharedButton
            text='Send'
            style={`bg-green-500 mr-3`}
            name='sendMail'
            handleClick={sendMail}
          />
          {/* <div className="relative w-8 h-8 cursor-pointer">
          <img
            src={paperclip_black}
            alt="icon"
            className="absolute mr-3 top-2 cursor-pointer"
          />
          <input
            type="file"
            className="absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 "
            name="file"
            onChange={handleChange}
            multiple
          />
        </div> */}
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
