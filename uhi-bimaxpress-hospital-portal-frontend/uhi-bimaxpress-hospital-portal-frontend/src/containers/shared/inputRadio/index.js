import React from 'react';
import styles from './InputRadio.module.css';

const InputRadio = ({
  handleChange,
  name,
  value,
  label = '',
  radioLabel = '',
  fieldName,
  disabled = false
}) => {
  return (
    <div className='flex flex-col'>
      {label ? (
        <p className='pb-3 text-sm text-fontColor-light'>{label}</p>
      ) : null}

      <label className={styles.radioContainer}>
        {radioLabel}
        <input
          onChange={handleChange}
          type='radio'
          name={name}
          value={value}
          checked={fieldName == value}
          disabled={disabled}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default InputRadio;
