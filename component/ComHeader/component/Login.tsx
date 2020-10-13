import React, { useState, useContext, createContext } from 'react';
import { Modal, Button } from 'antd';
//
import { UserContext } from '@/component/ComHeader/index';

const Login = () => {
  let { isModalLogin, setIsModalLogin } = useContext(UserContext);
  const handleOk = () => {
    console.log('ok');
  };
  const handleCancel = () => {
    setIsModalLogin(false);
  };
  return (
    <>
      {isModalLogin && (
        <Modal title='Basic Modal' visible={true} onOk={handleOk} onCancel={handleCancel}>
          登录
        </Modal>
      )}
    </>
  );
};
export default Login;
