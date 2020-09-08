import React, { useState, useEffect } from 'react';
import { Card, Carousel } from 'antd';
//
import styles from './index.module.scss';
//
const ComHeader = (props) => {
  const { toProps } = props;
  return (
    <>
      <Card className="card-p0 mb20">
        <div className={styles.banner}>
          <Carousel autoplay adaptiveHeight={true}>
            {toProps.length &&
              toProps.map((t, i) => {
                return (
                  <div key={i}>
                    <img src={t.imagePath} alt="" />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </Card>
    </>
  );
};
export default ComHeader;
