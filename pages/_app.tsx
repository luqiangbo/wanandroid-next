import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
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
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <ConfigProvider {...globalConfig}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout title={pageProps.title}>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}
