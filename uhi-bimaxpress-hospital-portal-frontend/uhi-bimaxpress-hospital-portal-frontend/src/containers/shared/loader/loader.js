import React, { useEffect } from "react";
import styles from "./Loder.module.css";
const Loader = (props) => {
  const { sharedLoader } = props.state;
  return (
    <>
      {sharedLoader && (
        <div className={styles.preloader}>
          <svg
            width="150"
            height="150"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="lds-ripple"
          >
            <circle
              cx="50"
              cy="50"
              r="4.719"
              fill="none"
              stroke="#1d3f72"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;40"
                keyTimes="0;1"
                dur="3"
                keySplines="0 0.2 0.8 1"
                begin="-1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="3"
                keySplines="0.2 0 0.8 1"
                begin="-1.5s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx="50"
              cy="50"
              r="27.591"
              fill="none"
              stroke="#5699d2"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;40"
                keyTimes="0;1"
                dur="3"
                keySplines="0 0.2 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="3"
                keySplines="0.2 0 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      )}
    </>
  );
};

export default Loader;
