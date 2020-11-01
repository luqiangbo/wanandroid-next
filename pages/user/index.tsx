import React from 'react';
import { getUser } from 'fetchMiddleware/index';

const User = () => {
  return (
    <>
      <div>个人中心</div>
    </>
  );
};
export const getStaticProps = async (ctx) => {
  console.log('user', ctx);
  // const { headers } = ctx.req;
  // console.log('p req', headers);
  //
  const [err, res] = await getUser({ headers: 'xiaoming' });
  return {
    props: {
      name: 'hahs',
    },
  };
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default User;
