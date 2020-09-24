import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect } from 'ahooks';
//
import { getIssueMore, getIssueGoods } from 'fetchApi/index';
import Entry from 'component/Entry';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
import RightUser from 'component/ComRight/component/RightUser';
//
const PageIssue = ({ works, hotkey }) => {
  return useObserver(() => (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <Entry toProps={works} />
          </Col>
          <Col xs={0} sm={8}>
            <ComRight>
              <RightSearch />
              <RightHotkey toProps={hotkey} />
              <RightUser />
            </ComRight>
          </Col>
        </Row>
      </div>
    </>
  ));
};

export const getServerSideProps = async (context) => {
  //
  const [err, res] = await getIssueGoods();
  console.log('pageissue', err);
  if (err) {
    return {
      props: {
        hotkey: [],
        works: {
          curPage: 1,
          datas: [],
          offset: 0,
          over: false,
          pageCount: 458,
          size: 20,
          total: 9156,
        },
      },
    };
  }
  return {
    props: {
      works: res[0],
      hotkey: res[1],
    },
  };
};

export default PageIssue;
