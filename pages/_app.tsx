import React from 'react';
import 'antd/dist/antd.css';
import '../styles/global.less';
import { ConfigProvider } from 'antd';

// https://github.com/ant-design/ant-design/issues/18336
// 同用nextjs，官网上的demo是引用的es目录的，要改成lib目录才是commonjs的形式。。
// import zhCN from 'antd/es/locale/zh_CN';
import zhCN from 'antd/lib/locale/zh_CN';

const globalConfig = {
  locale: zhCN,
};
export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider {...globalConfig}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
