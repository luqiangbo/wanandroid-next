import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';

//
import { getSearch } from 'fetchApi/index';
import Entry from 'component/Entry';
import ComRight from 'component/ComRight';
import RightSearch from 'component/ComRight/component/RightSearch';
import RightHotkey from 'component/ComRight/component/RightHotkey';
import RightUser from 'component/ComRight/component/RightUser';
//

const PageSearch = ({ works, hotkey }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id);
  //
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [worksMore, setWorksMore] = useState({ ...works });
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  return (
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
          </ComRight>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  // console.log('pagesearch', query);
  const [err, res] = await getSearch(query);
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
    },
  };
};
export default PageSearch;
