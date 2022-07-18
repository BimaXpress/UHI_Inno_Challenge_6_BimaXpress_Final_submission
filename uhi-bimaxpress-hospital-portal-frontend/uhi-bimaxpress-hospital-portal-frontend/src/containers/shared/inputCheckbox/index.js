import React from 'react';
import styles from './InputCheckbox.module.css';

const InputCheckbox = ({
  handleChange,
  name,
  value,
  checkboxLabel,
  label,
  labelStyle,
  checkboxLabelStyle,
  checked,
  checkboxInputStyle = '',
}) => {
  return (
    <>
      <p className={`font-semibold text-white  text-lg ${labelStyle} `}>
        {label}
      </p>
      <div className='flex flex-row'>
        <div>
          <input
            type='checkbox'
            id={name}
            name={name}
            checked={checked}
            className={`${styles.inputCheckbox} text-blue-700 rounded ${checkboxInputStyle} `}
            value={value}
            onChange={handleChange}
          />
          <label
            htmlFor={name}
            className={`text-white ml-3 font-semibold text-lg select-none ${checkboxLabelStyle}`}
          >
            {checkboxLabel}
          </label>
        </div>
      </div>
    </>
  );
};

export default InputCheckbox;
