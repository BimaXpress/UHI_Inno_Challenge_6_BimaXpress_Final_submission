import React from 'react';
import styles from './InputDate.module.css';

const InputDate = ({
  handleChange,
  name,
  label,
  value,
  style = {},
  labelStyle = {},
  type = 'date',
  isEdit = true,
}) => {
  return (
    <div>
      {label ? (
        <p
          className='pb-3 font-semibold text-fontColor mt-3'
          style={labelStyle}
        >
          {label}
        </p>
      ) : null}

      <input
        type={type}
        name={name}
        placeholder='Select date'
        value={value}
        onChange={handleChange}
        className={`${styles.inputDate}`}
        style={style}
        disabled={!isEdit}
      />
    </div>
  );
};

export default InputDate;
