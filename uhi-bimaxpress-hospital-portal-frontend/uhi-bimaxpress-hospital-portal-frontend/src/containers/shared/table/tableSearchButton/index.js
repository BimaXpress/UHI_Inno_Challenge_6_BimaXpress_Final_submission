import React from 'react';
import styles from './TableSearchButton.module.css';

const TableSearchButton = ({ text = 'Search', handleClick = () => {} }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
};

export default TableSearchButton;
