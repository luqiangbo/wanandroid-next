import React, { useState, useEffect } from 'react';
import { Affix } from 'antd';
//
import styles from './index.module.scss';
//
const ComRight = ({ children }) => {
  const [top, setTop] = useState(80);
  return (
    <>
      <Affix offsetTop={top}>
        <div className={styles['row-right']}>{children}</div>
      </Affix>
    </>
  );
};
export default ComRight;
