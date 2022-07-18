import React, { useState, useEffect, useRef } from 'react';

export const Footer = () => {
  return (
    <div className='w-full  lg:px-48 bg-black text-white py-8 border-t border-gray-600'>
      <div className=' grid grid-cols-1 md:gap-44 sm:gap-12 sm:ml-0 ml-20 sm:grid-cols-3'>
        <div className='flex flex-col'>
          {/* <img src="logo.svg" className="md:w-44 w-30 h-10 ml-0 sm:ml-10 md:ml-0 md:h-16" alt="" /> */}
          <img src='logo.svg' className='w-44 h-16 sm:ml-10 ml-0' alt='' />
        </div>
        <div className='flex flex-col sm:mt-0 mt-10'>
          <div className='mb-4 font-semibold text-lg'>About</div>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>Blog</div>
          </p>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>Team</div>
          </p>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>Private Policy</div>
          </p>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>Terms and conditions</div>
          </p>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>Terms of Sale </div>
          </p>
          <p className='flex items-center my-1'>
            <div className=' text-sm'>FAQ / Support</div>
          </p>
        </div>

        <div className='flex flex-col sm:mt-0 mt-10'>
          <div className='mb-4 font-semibold text-lg'>Social</div>
          <p className='flex items-center my-1 hover:text-blue-500'>
            <div>
              <i className='fab fa-twitter'></i>
            </div>
            <div className='pl-2 text-sm'>Twitter</div>
          </p>
          <p className='flex items-center my-1 hover:text-red-400'>
            <div>
              <i className='fab fa-instagram'></i>
            </div>
            <div className='pl-2 text-sm'>Instagram</div>
          </p>
          <p className='flex items-center my-1 hover:text-blue-400'>
            <div>
              <i className='fab fa-facebook-square'></i>
            </div>
            <div className='pl-2 text-sm'>Facebook</div>
          </p>
          <p className='flex items-center my-1 hover:text-red-800'>
            <div>
              <i className='fab fa-youtube'></i>
            </div>
            <div className='pl-2 text-sm'>Youtube</div>
          </p>
        </div>
      </div>
      <div className='flex justify-center item-center flex-col sm:ml-10 ml-10'>
        <div className='mt-8 text-sm '>
          <div>
            BimaXpress is by{' '}
            <span className='font-semibold'>RNLP Consulting</span>
          </div>
          <div className='mt-1'>
            {' '}
            Copyright © 2022{' '}
            <span className=' font-normal text-gray-300 '>
              RNLP Consulting and Technology Service Pvt. Ltd
            </span>
            . All rights reserved.
          </div>
        </div>
        <div className='mt-3 text-sm'>
          Made with Love for{' '}
          <span
            style={{ color: '#fc6203' }}
            className='text-base font-semibold'
          >
            India
          </span>{' '}
        </div>
      </div>
    </div>
  );
};
