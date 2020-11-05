import React, { useState, useEffect } from 'react';
import { Card, Input } from 'antd';
const { Search } = Input;
//
interface Props {
  toProps?: any;
}

const RightSearch = ({ toProps }: Props) => {
  const onSearchText = (v) => {
    console.log(v);
  };
  return (
    <>
      <Card className='mb20 card-p0'>
        <div>
          <Search placeholder='搜索文字/标签/用户' size='large' value={toProps} onSearch={(v) => onSearchText(v)} />
        </div>
      </Card>
    </>
  );
};
export default RightSearch;
