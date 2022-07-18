import React from 'react';
import styles from './HomeCard.module.css';
import { format } from 'date-fns';

const HomeCard = ({
  icon,
  name,
  amount,
  gradiant,
  color,
  bgColor,
  borderColor,
  bgHover,
  counts,
  updateAt,
  patientName,
}) => {
  function backgroundColor() {
    switch (name) {
      case 'Draft':
        return {
          color: 'bg-blue-500',
          gradiant: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          borderColor: 'border-blue-500',
        };

      case 'Unprocess':
        return {
          color: 'bg-emerald-500',
          gradiant: 'bg-gradient-to-r from-emerald-700 to-emerald-400',
          borderColor: 'border-emerald-500',
        };

      case 'Queries':
        return {
          color: 'bg-yellow-500',
          gradiant: 'bg-gradient-to-r from-yellow-700 to-yellow-400',
          borderColor: 'border-yellow-500',
        };

      case 'Approved':
        return {
          color: 'bg-green-500',
          gradiant: 'bg-gradient-to-r from-emerald-700 to-emerald-400',
          borderColor: 'border-green-500',
        };

      case 'Rejected':
        return {
          color: 'bg-red-300',
          gradiant: 'bg-gradient-to-r from-red-800 to-red-400',
          borderColor: 'border-red-300',
        };

      case 'Printed':  
      case 'Enhance':
        return {
          color: 'bg-cyan-400',
          gradiant: 'bg-gradient-to-r from-cyan-800 to-cyan-400',
          borderColor: 'border-cyan-400',
        };

      case 'Completed':
      case 'FCI':
      case 'Settled':
        return {
          color: 'bg-teal-500',
          gradiant: 'bg-gradient-to-r from-teal-300 to-teal-500',
          borderColor: 'border-teal-500',
        };

      case 'Discharge Approved':
        return {
          color: 'bg-blue-500',
          gradiant: 'bg-gradient-to-r from-blue-300 to-blue-500',
          borderColor: 'border-blue-500',
        };

      default:
        return {
          color: 'bg-red-500',
          gradiant: 'bg-gradient-to-r from-emerald-700 to-emerald-400',
          borderColor: 'border-red-500',
        };
    }
  }

  const cardColor = backgroundColor();

  return (
    <div
      className={` flex flex-col ${styles.card} hover:border ${cardColor.borderColor} hover:bg-opacity-40 cursor-pointer rounded-md bg-opacity-20 ${cardColor?.color}`}
    >
      <div className='flex  justify-between w-full'>
        <div className='flex'>
          <div
            className={` ${cardColor?.gradiant} text-lg mr-4 w-11 h-11  rounded-full flex justify-center items-center shadow-lg`}
          >
            <i className={`${icon} text-white text-sm`}></i>
          </div>
          <p className={`w-20 text-base font-semibold text-white`}>{name}</p>
        </div>
        <p className={`text-3xl text-white  font-bold`}>{counts}</p>
      </div>
      <div className='w-full flex justify-end'>
        <div>
          <p className={` mt-3 text-gray-300 font-semibold text-xs `}>
            {patientName !== '' ? patientName : ''}
          </p>
          <p className={` text-gray-400 text-xs mt-0.5 `}>
            {updateAt !== ''
              ? format(new Date(updateAt), 'd LLL Y hh:mm a')
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
