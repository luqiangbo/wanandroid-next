import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
//
import { setIsLogin, setUserInfo } from '@/store-redux/outline/action';
import { getLogin } from '@/fetchMdw/index';
interface Props {
  onCallBack?: () => any;
}
//
const Login = ({ onCallBack }: Props) => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const rulesUsername = [{ required: true, message: '请输入你的名字' }];
  const rulesPassword = [{ required: true, message: '请输入你的密码' }];
  // 成功
  const onFinish = async (values) => {
    const [err, res] = await getLogin(values);
    if (res.errorCode) {
      message.error(res.errorMsg);
      return;
    }
    dispatch(setIsLogin(true));
    dispatch(setUserInfo(res));
    onCallBack && onCallBack();
    message.success('登录成功');
    if (pathname === '/login') {
      router.push('/');
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
        <Form.Item className='submit-button'>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
