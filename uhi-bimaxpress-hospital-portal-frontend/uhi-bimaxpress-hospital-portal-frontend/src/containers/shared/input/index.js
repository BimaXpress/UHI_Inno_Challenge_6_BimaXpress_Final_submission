import React, { forwardRef, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import styles from './Input.module.css';

const Input = ({
  handleChange,
  name,
  value,
  type = 'text',
  label = '',
  isEdit = true,
  style = {},
  inputRef,
  placeHolder = '',
  isPassword = false,
  labelStyle = {},
}) => {
  const [showInput, setShowInput] = useState(false);
  if (!isEdit) {
    return (
      <>
        {label ? (
          <p className='pb-4 text-sm text-fontColor-light font-thin'>{label}</p>
        ) : null}
        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-light `}
          style={{ height: value ? 'inherit' : '34px' }}
        >
          {value}
        </p>
      </>
    );
  }
  return (
    <>
      {label ? (
        <p className={`pb-4 text-sm text-fontColor-light ${labelStyle}`}>
          {label}
        </p>
      ) : null}
      <div className='border border-fontColor-light rounded-md flex items-center'>
        <input
          className={`outline-none rounded-md border-none px-2 py-1 w-full text-base text-fontColor-light bg-transparent font-thin placeholder-primary-lightest ${styles.input}`}
          value={value}
          name={name}
          onChange={(e) => handleChange(e)}
          type={showInput ? 'text' : type}
          style={style}
          ref={inputRef ? inputRef : null}
          placeholder={placeHolder}
        />
        {isPassword ? (
          showInput ? (
            <BsEyeSlash
              className='text-lg text-fontColor-light mx-2 cursor-pointer'
              onClick={() => setShowInput((pre) => !pre)}
            />
          ) : (
            <BsEye
              className='text-lg text-fontColor-light mx-2 cursor-pointer'
              onClick={() => setShowInput((pre) => !pre)}
            />
          )
        ) : null}
      </div>
    </>
  );
};

export default forwardRef(Input);
