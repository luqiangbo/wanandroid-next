import React from 'react';
import Link from 'next/link';
import { Card, Tag } from 'antd';
//
//
const RightHotkey = ({ toProps }) => {
  return (
    <>
      <Card size='small' title='搜索热词' className='mb20 card-p10'>
        {toProps.map((t) => {
          return (
            <Link key={t.id} href='/search/[id]' as={`/search/${t.name}`}>
              <Tag color='default' className='cp mb5'>
                {t.name}
              </Tag>
            </Link>
          );
        })}
      </Card>
    </>
  );
};

export default RightHotkey;
