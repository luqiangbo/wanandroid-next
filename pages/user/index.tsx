import React, { useEffect } from 'react';
import { getCoinMdw } from '@/fetchMdw/index';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash';
import { useUpdateEffect, useInViewport } from 'ahooks';
//
import { redirect } from '@/util';
//

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
  const [err, res] = await getCoinMdw({ headers });
  // console.log('p user', err, res);
  if (res.errorMsg) {
    redirect(Router, ctx, '/login');
  }
  return {
    props: {
      name: 'hahs',
    },
  };
};

export default User;
