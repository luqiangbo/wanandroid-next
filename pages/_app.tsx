import React from 'react';
import { Provider } from 'react-redux';
import { Provider as ProviderMobx } from 'mobx-react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
//
import { useStoreRedux } from 'store-redux';
import { useStoreMobx } from 'store-mobx';
import 'styles/global.scss';
import Layout from '@/component/Layout';
//
// https://github.com/ant-design/ant-design/issues/18336
// 同用nextjs，官网上的demo是引用的es目录的，要改成lib目录才是commonjs的形式。。
// import zhCN from 'antd/es/locale/zh_CN';
import zhCN from 'antd/lib/locale/zh_CN';

const globalConfig = {
  locale: zhCN,
};
export default function App({ Component, pageProps }) {
  const store = useStoreRedux(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  // mobx
  const storeMobx = useStoreMobx(pageProps.initialState);
  //
  return (
    <Provider store={store}>
      <ProviderMobx store={storeMobx}>
        <ConfigProvider {...globalConfig}>
          <Layout title={pageProps.title}>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </ProviderMobx>
    </Provider>
  );
}
