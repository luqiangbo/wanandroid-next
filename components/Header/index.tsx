import React, { useState, useContext, createContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Affix, Avatar, Dropdown } from 'antd';
import Cookie from 'js-cookie';
import { get } from 'lodash';
//
import styles from './index.module.scss';
import { setMenuCurrent, setUserInfo, setIsLogin } from 'store-redux/outline/action';
import CLoginModal from './components/LoginModal';
import CRegisterModal from './components/RegisterModal';

interface ContextType {
  isModalLogin: boolean;
  setIsModalLogin: Function;
  isModalRegister: boolean;
  setIsModalRegister: Function;
}
export const UserContext = createContext<ContextType>({
  isModalLogin: false,
  setIsModalLogin: () => {},
  isModalRegister: false,
  setIsModalRegister: () => {},
});

//
const ComHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  //

  const [top, setTop] = useState(0);
  const menuCurrent = ['/'];
  const userInfo = {};
  const isLogin = false;
  const menu = [
    {
      value: '/',
      label: '首页',
    },
    {
      value: '/article',
      label: '广场',
    },
    {
      value: '/navi',
      label: '导航',
    },
    {
      value: '/issue',
      label: '问答',
    },
    {
      value: '/tree',
      label: '体系',
    },
    {
      value: '/project',
      label: '项目',
    },
  ];
  // console.log('redux com header', menuCurrent, menu);
  const onMenu = (e) => {
    // console.log('com header', e);
    const { key, keyPath } = e;
    router.push(key);
    dispatch(setMenuCurrent(keyPath));
  };

  const onLogin = () => {
    setIsModalLogin((t) => !t);
  };
  const onLoginOut = () => {
    Cookie.remove('loginUserName');
    Cookie.remove('token_pass');
    dispatch(setIsLogin(false));
    dispatch(setUserInfo({}));
    router.push('/');
  };
  const onRegister = () => {
    setIsModalRegister((t) => !t);
  };
  const menuss = (
    <Menu>
      <Menu.Item>
        <Link href='/user' as={`/user`}>
          个人中心
        </Link>
      </Menu.Item>
      <Menu.Item onClick={onLoginOut}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Affix offsetTop={top}>
        <div className={styles.main}>
          <div className='container'>
            <div className='mb20 com-header'>
              <Menu mode='horizontal' onClick={onMenu} selectedKeys={menuCurrent} className='pb10'>
                {menu.map((t) => (
                  <Menu.Item key={t.value}>{t.label}</Menu.Item>
                ))}
              </Menu>
              <div className='com-header-right'>
                {isLogin ? (
                  <Dropdown overlay={menuss} placement='bottomRight'>
                    <Avatar size='large' style={{ backgroundColor: '#303030' }}>
                      {get(userInfo, 'publicName', '名字')}
                    </Avatar>
                  </Dropdown>
                ) : (
                  <>
                    <div className='login' onClick={onLogin}>
                      登录
                    </div>
                    <div
                      className='register cp'
                      onClick={() => {
                        onRegister();
                      }}>
                      注册
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Affix>
      <UserContext.Provider value={{ isModalLogin, setIsModalLogin, isModalRegister, setIsModalRegister }}>
        <CLoginModal></CLoginModal>
        <CRegisterModal></CRegisterModal>
      </UserContext.Provider>
    </>
  );
};
export default ComHeader;
