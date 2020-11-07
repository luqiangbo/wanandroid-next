import React from 'react';
import Router from 'next/router';
import { Card } from 'antd';
import { trim } from 'lodash';
//
import CLogin from '@/components/Login';
import { redirect } from '@/util';
//
const PageLogin = () => {
  return (
    <>
      <div className='container page-login'>
        <Card>
          <CLogin></CLogin>
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
