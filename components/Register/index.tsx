import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
//
import { setIsLogin, setUserInfo } from '@/store-redux/outline/action';
import { getRegister } from '@/fetchMdw/index';
interface Props {
  onCallBack?: () => any;
}
//
const Register = ({ onCallBack }: Props) => {
  const router = useRouter();
  const rulesUsername = [
    { required: true, message: '请输入你的名字' },
    { min: 6, max: 12, message: '最小长度6最大长度12' },
  ];
  const rulesPassword = [
    { required: true, message: '请输入你的密码' },
    { min: 6, max: 12, message: '最小长度6最大长度12' },
  ];
  const rulesRePassword = [
    { required: true, message: '请再次输入你的密码' },
    { min: 6, max: 12, message: '最小长度6最大长度12' },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('两次密码不一样');
      },
    }),
  ];
  // 成功
  const onFinish = async (values) => {
    const [err, res] = await getRegister(values);
    const { errorCode, errorMsg } = res;
    if (errorCode === -1) {
      message.error(errorMsg);
    } else {
      message.success('注册成功');
      onCallBack && onCallBack();
    }
  };
  // 失败
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className='c-login'>
        <Form.Item label='账户' name='username' rules={rulesUsername}>
          <Input />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={rulesPassword}>
          <Input.Password />
        </Form.Item>
        <Form.Item label='密码' name='repassword' rules={rulesRePassword} dependencies={['password']}>
          <Input.Password />
        </Form.Item>
        <Form.Item className='submit-button'>
          <Button type='primary' htmlType='submit'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Register;
