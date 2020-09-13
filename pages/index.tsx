import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStore, useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';
//
import { initializeStoreRedux } from 'store-redux';
import { serverRenderClock } from 'store-redux/timer/action';
import { useStoreMobx } from 'store-mobx';
import { getIndex, getIndexEntry } from 'fetchApi/index';
import Entry from 'component/Entry';
import Banner from 'component/Banner';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
import RightUser from 'component/ComRight/component/RightUser';
//
const PageIndex = ({ banner, works, hotkey, initialReduxState }) => {
  // store redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serverRenderClock());
  }, []);
  // store mobx
  const todoList = useStoreMobx({});
  console.log('pageindex', todoList + '');
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
    const [err, res] = await getIndexEntry(page);
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
            <Banner toProps={banner} />
            <Spin spinning={loadingEntry}>
              <Entry toProps={worksMore} />
              <div ref={moreRef}></div>
            </Spin>
          </Col>
          <Col xs={0} sm={8}>
            <ComRight>
              {JSON.stringify(initialReduxState)}
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
  const reduxStore = initializeStoreRedux({});

  //
  const [err, res] = await getIndex();
  // console.log('pageindex', err, res);
  if (err) {
    return {
      props: {
        banner: [],
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
      banner: res[0],
      works: res[1],
      hotkey: res[2],
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default PageIndex;
