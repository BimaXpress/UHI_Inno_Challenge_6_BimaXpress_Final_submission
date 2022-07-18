import React from 'react';
import AsyncSelect from 'react-select/async';
const SearchableSelect = ({
  style = {},
  label = 'Label',
  labelClass = {},
  name,
  handleChangeSelect,
  loadOptions,
  selectValue,
  selectPlaceHolder,
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
  };

  return (
    <>
      <div className={`flex justify-center items-start flex-col ${style}`}>
        <div className='flex w-full justify-between text-white '>
          <p
            className={`flex font-semibold items-start mt-3 text-white ${labelClass}`}
          >
            {label}
          </p>
        </div>

        <div className={`flex items-center rounded-md w-full my-4`}>
          <AsyncSelect
            name={name}
            cacheOptions
            defaultOptions
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e._id}
            onChange={handleChangeSelect}
            loadOptions={loadOptions}
            isClearable={true}
            className={`w-full`}
            placeholder={selectPlaceHolder}
            value={selectValue}
            noOptionsMessage={({ inputValue }) =>
              !inputValue ? 'Type to search' : 'No results found'
            }
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default SearchableSelect;
