import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
//
import { useStore } from 'store/index';
import 'styles/global.scss';
import Layout from 'component/Layout';
//
// https://github.com/ant-design/ant-design/issues/18336
// 同用nextjs，官网上的demo是引用的es目录的，要改成lib目录才是commonjs的形式。。
// import zhCN from 'antd/es/locale/zh_CN';
import zhCN from 'antd/lib/locale/zh_CN';

const globalConfig = {
  locale: zhCN,
};
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <ConfigProvider {...globalConfig}>
      <Provider store={store}>
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ConfigProvider>
  );
}
