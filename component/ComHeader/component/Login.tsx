import React, { useContext, createContext } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
//
import { setIsLogin, setUserInfo } from '@/store-redux/outline/action';
import { UserContext } from '@/component/ComHeader/index';
import { getLogin } from '@/fetchMdw/index';

const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.outline.isLogin);
  const rulesUsername = [{ required: true, message: '请输入你的名字' }];
  const rulesPassword = [{ required: true, message: '请输入你的密码' }];
  let { isModalLogin, setIsModalLogin } = useContext(UserContext);
  const handleOk = () => {
    // console.log('ok');
  };
  const handleCancel = () => {
    setIsModalLogin(false);
  };
  const onFinish = async (values) => {
    const [err, res] = await getLogin(values);
    // console.log('c login', res);
    if (res.errorCode) {
      message.error(res.errorMsg);
      return;
    }
    dispatch(setIsLogin(true));
    dispatch(setUserInfo(res));
    handleCancel();
    message.success('登录成功');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {isModalLogin && (
        <Modal title='登录' visible={true} onOk={handleOk} onCancel={handleCancel} footer={null} className='c-modal-login'>
          <Form name='basic' initialValues={{ remember: true }} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label='账户' name='username' rules={rulesUsername}>
              <Input />
            </Form.Item>
            <Form.Item label='密码' name='password' rules={rulesPassword}>
              <Input.Password />
            </Form.Item>
            <Form.Item className='submit-button'>
              <Button type='primary' htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default Login;
