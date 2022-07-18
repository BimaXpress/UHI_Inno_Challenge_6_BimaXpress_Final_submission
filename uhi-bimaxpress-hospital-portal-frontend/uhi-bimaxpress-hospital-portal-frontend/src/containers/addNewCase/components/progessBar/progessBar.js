import React from "react";
import styles from "./bnplProgessBar.module.css";
import { BiCheck } from "react-icons/bi";

const ProgessBar = ({ step, setStep }) => {
  return (
    <>
      <div className=" ">
        <div className={`${styles.progressbar} py-1 px-6`}>
          <div
            className={`${styles.step} ${step >= 1 ? styles.active : ""} ${
              step >= 2 ? styles.finish : ""
            } `}
            onClick={() => {
              setStep(1);
            }}
          >
            <span>
              {step >= 1 ? <BiCheck className={styles.ckeckIcon} /> : 1}
            </span>
          </div>

          <div
            className={`${styles.step} ${step >= 2 ? styles.active : ""} ${
              step >= 3 ? styles.finish : ""
            }  `}
            onClick={() => {
              setStep(2);
            }}
          >
            <span>
              {step >= 2 ? <BiCheck className={styles.ckeckIcon} /> : 2}
            </span>
          </div>

          <div
            className={`${styles.step_finall} ${styles.step} ${
              step >= 3 ? styles.active : ""
            } ${step >= 4 ? styles.finish : ""}  `}
            onClick={() => {
              setStep(3);
            }}
          >
            <span>
              {step >= 3 ? <BiCheck className={styles.ckeckIcon} /> : 3}
            </span>
          </div>

          {/* <div
          className={`${styles.step} ${step >= 4 ? styles.active : ''} ${
            styles.step_finall
          } ${step >= 4 ? styles.finish : ''}`}
          onClick={() => {
            setStep(4);
          }}
        >
          <span>
            {step >= 4 ? <BiCheck className={styles.ckeckIcon} /> : 4}
          </span>
        </div> */}
        </div>
        <div className=" text-gray-400 mt-1 text-xs justify-around space-x-6 flex flex-row">
          <p className={`${step >= 1 ? "text-orange" : "text-gray-400"}`}>
            Patient Details
          </p>
          <p className={`${step >= 2 ? "text-orange" : "text-gray-400"} pl-4`}>
            Diagnosis Details
          </p>
          <p className={`${step >= 3 ? "text-orange" : "text-gray-400"} pl-4`}>
            Admission Details
          </p>
        </div>
      </div>
    </>
  );
};

export default ProgessBar;
