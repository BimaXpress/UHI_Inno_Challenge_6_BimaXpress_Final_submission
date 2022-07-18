import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./TableSearchInput.module.css";

const TableSearch = ({
  placeholder = "Search hear...",
  value,
  handleChange,
  style = {},
}) => {
  return (
    <div
      className={`flex items-center ${styles.searchContainer}`}
      style={style}
    >
      <AiOutlineSearch className="mx-4 text-xl text-fontColor" />
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={`outline-none border-none bg-transparent text-sm text-fontColor w-full`}
      />
    </div>
  );
};

export default TableSearch;
