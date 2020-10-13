import React, { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useObserver } from 'mobx-react';
import { Menu, Affix } from 'antd';
//
import { useStoreMobx } from 'store-mobx';
import styles from './index.module.scss';
import { setMenuCurrent } from 'store-redux/outline/action';
import ModalLogin from './component/Login';

interface ContextType {
  isModalLogin: boolean;
  setIsModalLogin: Function;
}
export const UserContext = createContext<ContextType>({
  isModalLogin: false,
  setIsModalLogin: () => {},
});
// mobx
function useUserData() {
  const storeMobx = useStoreMobx({});
  console.log('useUserData', storeMobx);
  return useObserver(() => ({
    username: '123',
  }));
}
//
const ComHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //mobx
  const { username } = useUserData();
  console.log('comheader', username);
  //
  const [isModalLogin, setIsModalLogin] = useState(false);
  //

  const [top, setTop] = useState(0);
  const menuCurrent = useSelector((state) => state.outline.menuCurrent);
  const menu = useSelector((state) => state.outline.menu);
  console.log('com header', menuCurrent, menu);
  const onMenu = (e) => {
    console.log('com header', e);
    const { key, keyPath } = e;
    router.push(key);
    dispatch(setMenuCurrent(keyPath));
  };

  const onLogin = () => {
    console.log('登录');
    setIsModalLogin((t) => !t);
  };
  return (
    <>
      <Affix offsetTop={top}>
        <div className={styles.main}>
          <div className='container'>
            {/* {username} */}
            <div className='mb20 com-header'>
              <Menu mode='horizontal' onClick={onMenu} selectedKeys={menuCurrent} className='pb10'>
                {menu.map((t) => (
                  <Menu.Item key={t.value}>{t.label}</Menu.Item>
                ))}
              </Menu>
              <div className='com-header-right'>
                <div className='login' onClick={onLogin}>
                  登录
                </div>
                <div className='enroll'>注册</div>
              </div>
            </div>
          </div>
        </div>
      </Affix>
      <UserContext.Provider value={{ isModalLogin, setIsModalLogin }}>
        <ModalLogin></ModalLogin>
      </UserContext.Provider>
    </>
  );
};
export default ComHeader;
