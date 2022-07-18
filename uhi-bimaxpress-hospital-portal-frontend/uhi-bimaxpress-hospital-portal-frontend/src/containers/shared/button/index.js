import React from 'react';
const SharedButton = ({
  handleClick = () => {},
  text = 'Submit',
  style = 'bg-green-500',
  name = 'submit',
  disabled = false,
}) => {
  return (
    <>
      <button
        onClick={handleClick}
        className={`h-15 text-white px-4 py-1 rounded font-medium select-none ${style} `}
        name={name}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default SharedButton;
