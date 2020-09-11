import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Spin, Card } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';

//
import { getSearch, getSearchMore } from 'fetchApi/index';
import Entry from 'component/Entry';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
//

const PageSearch = ({ works, hotkey }) => {
  const router = useRouter();
  const { id } = router.query;
  //
  const [page, setPage] = useState(0);
  const [worksMore, setWorksMore] = useState(works);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hasMore, setHasMore] = useState(!works.over);
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);

  const fetchApiArticle = async () => {
    const [err, res] = await getSearchMore({ page, id });
    if (err) {
      console.log(err);
      return;
    }
    // console.log('fetchapiarticle', worksMore, err, res);
    const listWorks = [...worksMore.datas, ...res.datas];
    setLoadingSearch(false); // loading
    setHasMore(!res.over); // 是否还有
    setWorksMore({ ...res, datas: listWorks });
  };
  // page更新后执行
  useUpdateEffect(() => {
    setWorksMore(works);
    setPage(0);
    setHasMore(true);
  }, [id]);
  // page更新后执行
  useUpdateEffect(() => {
    if (page !== 0) {
      fetchApiArticle();
    }
  }, [page]);
  // 监听
  useUpdateEffect(() => {
    if (inViewPort && hasMore) {
      setLoadingSearch(true);
      setPage(page + 1);
      console.log('page', page);
    }
  }, [inViewPort]);
  return (
    <div className='container'>
      <Row>
        <Col xs={24} sm={16} className='mb20'>
          <Card className='mb20 card-p10'>搜索关键词 : {id}</Card>
          <Spin spinning={loadingSearch}>
            <Entry toProps={worksMore} />
            <div ref={moreRef}></div>
          </Spin>
        </Col>
        <Col xs={0} sm={8}>
          <ComRight>
            <div>
              page:{page} hasMore:{hasMore + ''}
            </div>
            <RightSearch toProps={id || ''} />
            <RightHotkey toProps={hotkey} />
          </ComRight>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  console.log('page search', query);
  const [err, res] = await getSearch(query.id);
  console.log('page search', err, res);
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
export default PageSearch;
