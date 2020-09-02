import React, { useState } from 'react';
import Link from 'next/link';
import { Button, message, Carousel } from 'antd';

import { getBanner } from 'api/shop';

const PageIndex = ({ data, banner }) => {
  function onChange() {
    console.log('object');
  }
  return (
    <>
      <div className="index-banner">
        <Carousel afterChange={onChange}>
          {banner &&
            banner.list.length &&
            banner.list.map((t, i) => {
              return (
                <div key={i}>
                  <img src={t.imagePath} alt="" />
                </div>
              );
            })}
        </Carousel>
      </div>
      ,<div className="main">hello next 2020-08-20 01:38</div>
      <div>{data}</div>
      <Button>
        <Link href="/a">
          <a>go t o a</a>
        </Link>
      </Button>
    </>
  );
};

export async function getServerSideProps() {
  const isBrowser = process.browser;
  const [err, res] = await getBanner();
  console.log(res);
  if (err) {
    if (isBrowser) {
      message.error('err');
    }
    return {
      props: {
        data: 'err',
        banner: {
          list: [],
        },
      },
    };
  }
  if (isBrowser) {
    message.success('成功');
  }
  return {
    props: {
      data: '123',
      banner: {
        list: res,
      },
    },
  };
}

export default PageIndex;
