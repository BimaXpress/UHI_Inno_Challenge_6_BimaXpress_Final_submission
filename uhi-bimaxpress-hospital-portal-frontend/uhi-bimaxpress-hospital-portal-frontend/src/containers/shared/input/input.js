import React, { forwardRef, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import styles from './Input.module.css';

const inputStyle = {};

const Input = ({
  handleChange,
  name,
  status = 'active',
  value,
  type = 'text',
  label = '',
  isEdit = true,
  inputClass = '',
  labelClass = {},
  style = {},
  inputRef,
  placeHolder = '',
  message = '',
  inputStyle = '',
  maxLength = '200',
}) => {
  const [showInput, setShowInput] = useState(false);

  if (status === 'error') {
    inputClass = 'border-red-500 bg-primary text-white';
  } else if (status === 'success') {
    inputClass = 'border-green-700  bg-primary text-white';
  } else {
    inputClass = `border-primary bg-primary text-white ${inputClass}`;
  }

  return (
    <>
      <div className={`flex justify-center  items-start flex-col ${style}`}>
        <div className='flex w-full justify-between'>
          <p
            className={`text-white flex font-semibold items-start mt-3 ${labelClass}`}
          >
            {label}
          </p>
          {status === 'error' ? (
            <p className=' text-xs text-red-500 mt-5'>{message}</p>
          ) : (
            <p className=' text-xs text-red-500 mt-5 hidden'>message</p>
          )}
        </div>

        <div
          className={`flex border !shadow-none !outline-none items-center rounded-md h-full w-full my-3 ${inputClass}`}
        >
          <input
            data-tooltip-target='tooltip-default'
            name={name}
            onWheel={
              type === 'number' ? () => document.activeElement.blur() : () => { }
            }
            type={showInput ? 'text' : type}
            placeholder={placeHolder}
            value={value}
            onChange={(e) => handleChange(e)}
            className={`text-white border-0 focus:border-0 focus:ring-0 !shadow-none !outline-none w-full h-full p-3 placeholder-gray-400 bg-transparent ${inputStyle}`}
            disabled={!isEdit}
            // maxlength='10'
            onInput={(e) => {
              if (e.currentTarget.value.length >= maxLength) {
                e.currentTarget.value = e.currentTarget.value.slice(
                  0,
                  maxLength
                );
              }
            }}
          ></input>

          {type === 'password' ? (
            showInput ? (
              <i
                className='fa-solid fa-eye-slash mr-4'
                onClick={() => {
                  setShowInput(!showInput);
                }}
              ></i>
            ) : (
              <i
                className='fa-solid fa-eye text-white mx-4'
                onClick={() => {
                  setShowInput(!showInput);
                }}
              ></i>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
