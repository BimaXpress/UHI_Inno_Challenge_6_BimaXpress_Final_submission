import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SharedButton from '../../../shared/button';
import InputCheckbox from '../../../shared/inputCheckbox';
import format from 'date-fns/format';
const EmailCard = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    emails,
    setSelectedMessageActivity,
    selectedMessage,
    refreshMail,
    totalData,
    limitEmail,
  } = props;

  const [checkedMailID, setcheckedMailID] = useState([]);

  const handleCheckedMails = (field) => {
    if (field.target.checked) {
      setcheckedMailID((pre) => [...pre, field.target.name]);
    } else {
      setcheckedMailID((pre) =>
        pre.filter((item) => item !== field.target.name)
      );
    }
  };

  const openEmail = (field) => {
    if (field.target.type !== 'checkbox') {
      setSelectedMessageActivity(field.target.id);
    }
  };
  return (
    <>
      <div className='rounded'>
        <div className='flex flex-col sm:flex-row justify-between gap-y-2 items-center'>
          {/* <div className='flex gap-x-2'>
                <input
                  type='text'
                  className='bg-primary outline-none text text-white rounded p-1 px-2'
                  placeholder='Search'
                />
                <SharedButton
                  text={<i className='fa-solid fa-magnifying-glass' />}
                  style='bg-gray-200 text-black '
                />
              </div> */}

          <div className='flex gap-x-2 py-1'>
            <SharedButton
              handleClick={() => {
                navigate(`/mail/${params.category}/${Number(params.page) - 1}`);
              }}
              text={<i className='fa-solid fa-arrow-left' />}
              style={`text-black ${
                Number(params.page) === 1 ? 'bg-gray-400 ' : '!bg-gray-100 '
              }`}
              disabled={Number(params.page) === 1 ? true : false}
            />

            <SharedButton
              handleClick={() => {
                navigate(`/mail/${params.category}/${Number(params.page) + 1}`);
              }}
              text={<i className='fa-solid fa-arrow-right' />}
              style={`text-black  ${
                Number(params.page) === Math.ceil(totalData / limitEmail)
                  ? '!bg-gray-400'
                  : '!bg-gray-100'
              }`}
              disabled={
                Number(params.page) === Math.ceil(totalData / limitEmail)
                  ? true
                  : false
              }
            />

            <SharedButton
              handleClick={() => {
                refreshMail();
              }}
              text={<i className='fa-solid fa-arrows-rotate' />}
              style={`text-black bg-gray-100 }`}
            />
            <SharedButton
              text={<i className='fa-solid fa-trash' />}
              style='bg-gray-100 !text-red-500'
            />
          </div>

          <div>
            <span className='text-white mr-1'>
              {Math.ceil(totalData / limitEmail) && (
                <>
                  Page: {params.page}/{Math.ceil(totalData / limitEmail)}
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col h-full  rounded gap-y-3  py-2 text-white'>
        {emails.map((mail) => {
          return (
            <div
              onClick={(e) => openEmail(e)}
              key={mail.messageId}
              id={mail.messageId}
              className={`flex flex-col ${
                selectedMessage === mail.messageId
                  ? 'bg-orange bg-opacity-50'
                  : 'bg-primary hover:bg-secondary'
              }   p-2 py-3 rounded cursor-pointer`}
            >
              <div className='flex flex-row justify-between w-full pointer-events-none'>
                <div className='flex pointer-events-none'>
                  <InputCheckbox
                    handleChange={handleCheckedMails}
                    name={mail.messageId}
                    checked={checkedMailID.includes(mail.messageId)}
                    checkboxInputStyle='pointer-events-auto'
                  />
                  <p className='font-semibold text-base pointer-events-none'>
                    {params.category === 'inbox'
                      ? mail.fromName
                        ? mail.fromName
                        : mail.from
                      : mail.to}
                  </p>
                </div>

                <p className='pointer-events-none'>
                  {format(new Date(mail.date), 'EEE, dd  MMM, yy')}
                </p>
              </div>
              <p className='pointer-events-none ml-8'>{mail.subject}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EmailCard;
