import React, { useContext } from 'react';
import { Modal } from 'antd';
//
import { UserContext } from '@/components/Header';
import Login from '@/components/Login';

const LoginModal = () => {
  let { isModalLogin, setIsModalLogin } = useContext(UserContext);
  const handleOk = () => {
    // console.log('ok');
  };
  const handleCancel = () => {
    setIsModalLogin(false);
  };
  const onCallback = () => {
    handleCancel();
  };
  return (
    <>
      {isModalLogin && (
        <Modal title='登录' visible={true} onOk={handleOk} onCancel={handleCancel} footer={null} className='c-modal-login'>
          <Login onCallBack={onCallback}></Login>
        </Modal>
      )}
    </>
  );
};
export default LoginModal;
