import React, { useState } from 'react';
import Router from 'next/router';
import { Card, Button } from 'antd';
import { trim } from 'lodash';
//
import CLogin from '@/components/Login';
import CRegister from '@/components/Register';
import { redirect } from '@/util';
//
const PageLogin = () => {
  const [isViewLog, setIsViewLog] = useState(true);
  return (
    <>
      <div className='container page-login'>
        <Card>
          {isViewLog ? <CLogin></CLogin> : <CRegister></CRegister>}
          <div className='flex-jc-d'>
            <Button
              type='link'
              onClick={() => {
                setIsViewLog((x) => !x);
              }}>
              {isViewLog ? '注册' : '登录'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { headers } = ctx.req;
  //
  let cookieList = [];
  if (headers.cookie) {
    const cookie = headers.cookie;
    cookieList = cookie.split(';').map((t) => {
      const tList = t.split('=');
      return {
        [trim(tList[0])]: trim(tList[1]),
      };
    });
  }
  let isLogin = false;
  cookieList.some((t) => {
    if (t.loginUserName) {
      isLogin = true;
      return;
    }
  });
  if (isLogin) {
    redirect(Router, ctx, '/');
  }
  return {
    props: {},
  };
};

export default PageLogin;
