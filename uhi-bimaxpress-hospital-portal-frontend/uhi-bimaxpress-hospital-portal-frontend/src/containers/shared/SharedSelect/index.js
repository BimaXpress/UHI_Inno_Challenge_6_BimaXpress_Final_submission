import React from "react";
import styles from "./sharedSelect.module.css";

const SharedSelect = ({
    options,
    handleChange,
    name,
    value = "",
    label = "",
    style = "",
    defaultOption = "Select",
    lightMode = false,
    disabled = false
}) => {
    const lightModeStyle = "w-full p-2 !outline-none rounded border border-black";

    return (
        <div>
            {label ? (
                <p className="pb-3 text-sm text-fontColor pl-1 mt-3 font-semibold">
                    {label}
                </p>
            ) : null}
            <select
                disabled={disabled}
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
                className={`${lightMode ? lightModeStyle : styles.select} ${style}`}
            >
                <option value="" className={`${styles.option}`}>
                    {defaultOption}
                </option>
                {options?.map((option, index) => {
                    return (
                        <option
                            value={option?.value}
                            key={index}
                            className={`${styles.option}`}
                        >
                            {option?.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SharedSelect;
