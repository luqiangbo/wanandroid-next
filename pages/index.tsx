import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';

const PageIndex = ({ allPostsData }) => {
  return (
    <>
      <div className="main">hello next2020</div>
      <Button>
        <Link href="/a">
          <a>go to a</a>
        </Link>
      </Button>
    </>
  );
};

export default PageIndex;
