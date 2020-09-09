import React from 'react';
import Head from 'next/head';
import { BackTop } from 'antd';
//
import ComHeader from '../ComHeader';
import ComFooter from '../ComFooter';
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
      <ComHeader />
      {children}
      <ComFooter />
      <BackTop />
    </>
  );
};
export default Layout;
