import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';

const PageIndex = () => {
  return (
    <>
      <div className="main">hello next 2020-08-20 01:38</div>
      <Button>
        <Link href="/a">
          <a>go to a</a>
        </Link>
      </Button>
    </>
  );
};

export default PageIndex;
