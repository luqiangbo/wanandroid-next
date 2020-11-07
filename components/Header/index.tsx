import React, { useState, useContext, createContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Affix, Avatar, Dropdown } from 'antd';
import Cookie from 'js-cookie';
//
import styles from './index.module.scss';
import { setMenuCurrent, setUserInfo, setIsLogin } from 'store-redux/outline/action';
import CLoginModal from './components/LoginModal';

interface ContextType {
  isModalLogin: boolean;
  setIsModalLogin: Function;
}
export const UserContext = createContext<ContextType>({
  isModalLogin: false,
  setIsModalLogin: () => {},
});
//
const ComHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalLogin, setIsModalLogin] = useState(false);
  //

  const [top, setTop] = useState(0);
  const menuCurrent = useSelector((state) => state.outline.menuCurrent);
  const menu = useSelector((state) => state.outline.menu);
  const isLogin = useSelector((state) => state.outline.isLogin);
  const userInfo = useSelector((state) => state.outline.userInfo);
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
  const onEnroll = () => {};
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
                    <Avatar size='large'>{userInfo && userInfo.publicName}</Avatar>
                  </Dropdown>
                ) : (
                  <>
                    <div className='login' onClick={onLogin}>
                      登录
                    </div>
                    <div
                      className='enroll'
                      onClick={() => {
                        onEnroll();
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
      <UserContext.Provider value={{ isModalLogin, setIsModalLogin }}>
        <CLoginModal></CLoginModal>
      </UserContext.Provider>
    </>
  );
};
export default ComHeader;
