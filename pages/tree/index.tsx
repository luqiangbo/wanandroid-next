import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';
//
import { getTree, getArticleQuery } from '@/fetchMdw/index';
import CEntry from '@/components/Entry';
import CRight from '@/components/Right';
import CTags from '@/components/Tags';
import CRCSearch from '@/components/Right/components/Search';
import CRCHotkey from '@/components/Right/components/Hotkey';
import CRCUser from '@/components/Right/components/User';
//
const PageArticle = ({ works, hotkey, tags }) => {
  //
  const router = useRouter();
  const { cid } = router.query;
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  const [worksMore, setWorksMore] = useState({ ...works });
  const [cidDefault, setCidDefault] = useState(tags[0].id);
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //
  const fetchApiArticle = async () => {
    const [err, res] = await getArticleQuery({ page, cid: cid ? cid : cidDefault });
    let listWorks = {};
    if (page === 0 && cid) {
      listWorks = res.datas;
    } else {
      listWorks = [...worksMore.datas, ...res.datas];
    }
    setLoadingEntry(false); // loading
    setHasMore(!res.over); // 是否还有
    setWorksMore({ ...res, datas: listWorks });
  };

  // page更新后执行
  useUpdateEffect(() => {
    fetchApiArticle();
  }, [page, cid]);
  // 监听
  useEffect(() => {
    if (inViewPort && hasMore) {
      setLoadingEntry(true);
      setPage(page + 1);
      // console.log('page', page);
    }
  }, [inViewPort]);
  //
  const parantHandler = (params) => {
    setPage(0);
    router.push(`/tree?cid=${params}`, undefined, { shallow: true });
  };
  //
  return useObserver(() => (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <CTags toProps={tags} handlerClick={parantHandler} />
            <Spin spinning={loadingEntry}>
              <CEntry toProps={worksMore} />
              <div ref={moreRef}></div>
            </Spin>
          </Col>
          <Col xs={0} sm={8}>
            <CRight>
              <CRCSearch />
              <CRCHotkey toProps={hotkey} />
              {/* <RightUser  /> */}
            </CRight>
          </Col>
        </Row>
      </div>
    </>
  ));
};

export const getServerSideProps = async (context) => {
  //
  const { query } = context;
  const [err, res] = await getTree(query);
  if (err) {
    return {
      props: {
        hotkey: [],
        tags: [],
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
      tags: res[2],
    },
  };
};

export default PageArticle;
