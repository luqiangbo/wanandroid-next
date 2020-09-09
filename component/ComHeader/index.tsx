import React, { useState, useEffect } from 'react';
import { Menu, Affix } from 'antd';
//
import styles from './index.module.scss';
//
const ComHeader = () => {
  const [top, setTop] = useState(0);
  const [current, setCurrent] = useState('1'); // nav
  const onMenu = (e) => {
    setCurrent((t) => e.key);
  };
  return (
    <>
      <Affix offsetTop={top}>
        <div className={styles.main}>
          <div className='container'>
            <div className='mb20 '>
              <Menu mode='horizontal' onClick={onMenu} selectedKeys={[current]} className='pb10'>
                <Menu.Item key='1'>首页</Menu.Item>
                <Menu.Item key='2'>广场</Menu.Item>
                <Menu.Item key='3'>导航</Menu.Item>
                <Menu.Item key='4'>广场</Menu.Item>
                <Menu.Item key='5'>体系</Menu.Item>
                <Menu.Item key='6'>项目</Menu.Item>
                <Menu.Item key='7'>公众号</Menu.Item>
                <Menu.Item key='8'>项目分类</Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </Affix>
    </>
  );
};
export default ComHeader;
