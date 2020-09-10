import React, { useState, useEffect } from 'react';
import { Card, Input } from 'antd';
const { Search } = Input;
//
const RightSearch = (props) => {
  const onSearchText = (v) => {
    console.log(v);
  };
  return (
    <>
      <Card className='mb20 card-p0'>
        <div>
          <Search placeholder='搜索文字/标签/用户' size='large' value={props.toProps} onSearch={(v) => onSearchText(v)} />
        </div>
      </Card>
    </>
  );
};
export default RightSearch;
