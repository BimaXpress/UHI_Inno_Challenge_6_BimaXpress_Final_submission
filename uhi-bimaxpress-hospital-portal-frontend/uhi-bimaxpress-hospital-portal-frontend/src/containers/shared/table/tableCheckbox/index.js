import React from 'react';
import styles from './TableCheckbox.module.css';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type='checkbox'
          className={`${styles.inputCheckbox} text-blue-700 rounded`}
          ref={resolvedRef}
          {...rest}
        />
      </>

      //   <input type="checkbox" ref={resolvedRef} {...rest} />
    );
  }
);

export default IndeterminateCheckbox;
