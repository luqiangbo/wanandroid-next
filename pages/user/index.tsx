import React, { useEffect } from 'react';
import { getUser } from '@/fetchMdw/index';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash';
import { useUpdateEffect, useInViewport } from 'ahooks';

const User = () => {
  const router = useRouter();
  const { pathname } = router;
  const isLogin = useSelector((state) => state.outline.isLogin);
  console.log('isLoginss', isLogin);

  // useEffect(() => {
  //   if (!isNil(isLogin)) {
  //     if (isLogin) {
  //       router.push(pathname);
  //     } else {
  //       router.push(`/login`);
  //     }
  //   }
  // }, [isLogin]);

  return (
    <>
      <div>个人中心</div>
    </>
  );
};
export const getServerSideProps = async (ctx) => {
  const { headers } = ctx.req;
  //
  const [err, res] = await getUser({ headers });
  console.log('p user', err, res);
  if (res.errorMsg) {
    redirect(ctx, '/login');
  }
  return {
    props: {
      name: 'hahs',
    },
  };
};
// 重定向
const redirect = ({ req, res }, path) => {
  // 如果包含 req 信息则表示代码运行在服务端
  if (req) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    // 客户端跳转方式
    Router.push(path);
  }
};

export default User;
