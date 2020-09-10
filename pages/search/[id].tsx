import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Spin, Card } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';

//
import { getSearch } from 'fetchApi/index';
import Entry from 'component/Entry';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
//

const PageSearch = ({ works, hotkey }) => {
  const router = useRouter();
  const { id } = router.query;
  //
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [worksMore, setWorksMore] = useState({ ...works });
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  return (
    <div className='container'>
      <Row>
        <Col xs={24} sm={16} className='mb20'>
          <Card className='mb20 card-p10'>搜索关键词 : {id}</Card>
          <Spin spinning={loadingEntry}>
            <Entry toProps={worksMore} />
            <div ref={moreRef}></div>
          </Spin>
        </Col>
        <Col xs={0} sm={8}>
          <ComRight>
            <RightSearch toProps={id || ''} />
            <RightHotkey toProps={hotkey} />
          </ComRight>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const [err, res] = await getSearch(query.id);
  // console.log('page search', err, res);
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
