import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';
//
import { useStoreMobx } from 'store-mobx';
import { getArticle, getArticleQuery } from '@/fetchMdw/index';
import CEntry from 'components/Entry';
import CRight from 'components/Right';
import CRCSearch from 'components/Right/components/Search';
import CRCHotkey from 'components/Right/components/Hotkey';
import CRCUser from 'components/Right/components/User';
//

interface Works {
  curPage: number;
  datas: number[];
  offset: number;
  over: boolean;
  pageCount: number;
  size: number;
  total: number;
}

interface Props {
  works: Works;
  hotkey: any[];
}

const PageArticle = ({ works, hotkey }: Props) => {
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
              <CEntry toProps={worksMore} />
              <div ref={moreRef}></div>
            </Spin>
          </Col>
          <Col xs={0} sm={8}>
            <CRight>
              <CRCSearch />
              <CRCHotkey toProps={hotkey} />
              {/* <RightUser /> */}
            </CRight>
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
