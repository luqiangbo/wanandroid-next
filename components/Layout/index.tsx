import React from 'react';
import Head from 'next/head';
import { BackTop } from 'antd';
//
import CHeader from '../Header';
import CFooter from '../Footer';
//
const Layout = ({ children, title = '我就是标题' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='renderer' content='webkit' />
        <link rel='icon' href='/static/favicon.ico' type='image/x-icon' />
      </Head>
      <CHeader />
      {children}
      <CFooter />
      <BackTop />
    </>
  );
};
export default Layout;
