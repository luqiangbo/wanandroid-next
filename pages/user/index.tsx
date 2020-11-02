import React, { useEffect } from 'react';
import { getUser } from '@/fetchMdw/index';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useUpdateEffect, useInViewport } from 'ahooks';

const User = () => {
  const router = useRouter();
  const { pathname } = router;
  const isLogin = useSelector((state) => state.outline.isLogin);
  console.log('isLoginss', isLogin);

  useEffect(() => {
    if (isLogin) {
      router.push(pathname);
    } else {
      router.push(`/login`);
    }
  }, [isLogin]);

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
  // if (typeof window !== 'undefined') {
  //   router.push('/login');
  // } else {
  //   ctx.res.writeHead(302, { Location: '/login' }).end();
  // }

  return {
    props: {
      name: 'hahs',
    },
  };
};

export default User;
