import React from 'react';
import { Card } from 'antd';
//
import CLogin from '@/components/Login';

//
const PageLogin = () => {
  return (
    <>
      <div className='container page-login'>
        <Card>
          <CLogin></CLogin>
        </Card>
      </div>
    </>
  );
};
export default PageLogin;
