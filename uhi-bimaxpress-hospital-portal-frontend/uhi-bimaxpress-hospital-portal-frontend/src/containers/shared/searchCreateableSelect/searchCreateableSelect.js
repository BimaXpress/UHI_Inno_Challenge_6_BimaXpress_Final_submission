import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

const SearchCreateableSelect = ({
  style = {},
  label = 'Email',
  labelClass = {},
  name,
  handleChangeSelect,
  loadOptions,
  selectValue,
  getOptionValue,
  placeholder,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      '*': {
        boxShadow: 'none !important',
        color: 'white !important',
        outline: 'none',
      },
      background: '#2C2C2C',
      outline: 'none !important',
      border: 'transparent',
      color: 'white !important',
    }),

    option: (provided) => ({
      ...provided,
      color: 'black !important',
      // background: '#2C2C2C',

      // '&:hover': {
      //   background: '#4C4C4C',
      // },
    }),
  };
  return (
    <>
      <div className={`flex justify-center items-start flex-col ${style}`}>
        <div className='flex w-full justify-between text-white '>
          <p className={`flex font-semibold items-start mt-3  ${labelClass}`}>
            {label}
          </p>
        </div>

        <div className={`flex items-center rounded-md w-full my-4`}>
          <AsyncCreatableSelect
            name={name}
            cacheOptions
            defaultOptions
            value={selectValue}
            getOptionLabel={(e) =>
              e.email || (
                <>
                  <span className='bg-green-500 p-1 rounded-md mr-2'>
                    Create:{' '}
                  </span>
                  {e.value}
                </>
              )
            }
            getOptionValue={getOptionValue}
            loadOptions={loadOptions}
            onChange={handleChangeSelect}
            isClearable={true}
            className={`w-full`}
            styles={customStyles}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};

export default SearchCreateableSelect;
