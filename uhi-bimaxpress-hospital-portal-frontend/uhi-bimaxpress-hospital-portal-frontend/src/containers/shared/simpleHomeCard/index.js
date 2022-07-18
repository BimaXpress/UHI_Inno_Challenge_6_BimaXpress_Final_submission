import React from 'react';
import styles from './HomeCard.module.css';

const SimpleHomeCard = ({
  icon,
  name,
  amount,
  gradiant,
  color,
  bgColor,
  borderColor,
}) => {
  return (
    <div
      className={`${styles.card} cursor-pointer rounded-md h-28  bg-opacity-30 ${bgColor}`}
    >
      <div className='flex'>
        <div
          className={` ${gradiant} text-lg mr-4 w-10 h-10  rounded-full flex justify-center items-center`}
        >
          <img src={icon} alt='icon' className='w-5 h-5' />
        </div>
        <p className={`w-20 font-semibold text-white text-base`}>{name}</p>
      </div>

      <p
        className={`text-3xl ${color} font-semibold ${
          name.length > 14 ? 'mt-0' : 'mt-4'
        } `}
      >
        {amount}
      </p>
    </div>
  );
};

export default SimpleHomeCard;
