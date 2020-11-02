import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';
//
import { useStoreMobx } from 'store-mobx';
import { getArticle, getArticleQuery } from '@/fetchMdw/index';
import Entry from 'component/Entry';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
import RightUser from 'component/ComRight/component/RightUser';
//
const PageArticle = ({ works, hotkey }) => {
  // store mobx
  // const todoList = useStoreMobx(null);
  // console.log('pageindex', todoList);
  //
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  const [top, setTop] = useState(80);
  const [worksMore, setWorksMore] = useState({ ...works });
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //
  const fetchApiArticle = async () => {
    const [err, res] = await getArticleQuery({ page });
    const listWorks = [...worksMore.datas, ...res.datas];
    setLoadingEntry(false); // loading
    setHasMore(!res.over); // 是否还有
    setWorksMore({ ...res, datas: listWorks });
  };
  // page更新后执行
  useUpdateEffect(() => {
    if (page !== 0) {
      fetchApiArticle();
    }
  }, [page]);
  // 监听
  useEffect(() => {
    if (inViewPort && hasMore) {
      setLoadingEntry(true);
      setPage(page + 1);
      // console.log('page', page);
    }
  }, [inViewPort]);

  return useObserver(() => (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <Spin spinning={loadingEntry}>
              <Entry toProps={worksMore} />
              <div ref={moreRef}></div>
            </Spin>
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
  const [err, res] = await getArticle();
  // console.log('pageindex', err, res);
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

export default PageArticle;
