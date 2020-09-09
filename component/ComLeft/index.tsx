import React, { useState, useEffect } from 'react';
import { Card, Affix, Input } from 'antd';
const { Search } = Input;
//
import styles from './index.module.scss';
//
const ComFooter = () => {
  const [top, setTop] = useState(80);
  const onSearchText = (v) => {
    console.log(v);
  };
  return (
    <>
      <Affix offsetTop={top}>
        <div className={styles['row-right']}>
          <Card className='mb20 card-p0'>
            <div>
              <Search placeholder='搜索文字/标签/用户' size='large' onSearch={(v) => onSearchText(v)} />
            </div>
          </Card>
          <Card size='small' title='搜索热词' className='mb20 card-p10'>
            <div></div>
          </Card>
          <Card size='small' title='个人中心' className='mb20 card-p10'>
            <div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
            </div>
          </Card>
        </div>
      </Affix>
    </>
  );
};

export const getServerSideProps = async (context) => {
  // const [err, res] = await getApi(`${server}/api/index`);
  // console.log('pageindex', err, res);

  return {
    props: {},
  };
};
export default ComFooter;
