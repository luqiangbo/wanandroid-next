import React, { useContext } from 'react';
import { Modal } from 'antd';
//
import { UserContext } from '@/components/Header';
import Register from '@/components/Register';

const LoginModal = () => {
  let { isModalRegister, setIsModalRegister } = useContext(UserContext);
  const handleOk = () => {
    // console.log('ok');
  };
  const handleCancel = () => {
    setIsModalRegister(false);
  };
  // 注册成功
  const onCallback = () => {
    handleCancel();
  };
  return (
    <>
      {isModalRegister && (
        <Modal title='注册' visible={true} onOk={handleOk} onCancel={handleCancel} footer={null} className='c-modal-login'>
          <Register onCallBack={onCallback}></Register>
        </Modal>
      )}
    </>
  );
};
export default LoginModal;
