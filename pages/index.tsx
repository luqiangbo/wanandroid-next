import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Spin, Affix } from 'antd';
import { useInViewport } from 'ahooks';
//
import styles from './index.module.scss';
import { getApi } from 'util/req';
import { server } from 'config/index';
import Entry from 'component/Entry';
import Banner from 'component/Banner';
//
const PageIndex = ({ banner, works }) => {
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  const [top, setTop] = useState(80);
  const [worksMore, setWorksMore] = useState({ ...works });
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //
  const fetchApiArticle = async () => {
    const [err, res] = await getApi(`${server}/api/index/entry`, { page });
    const listWorks = [...worksMore.datas, ...res.datas];
    setLoadingEntry(false); // loading
    setHasMore(!res.over); // 是否还有
    setWorksMore({ ...res, datas: listWorks });
  };
  //
  useEffect(() => {
    if (inViewPort) {
      fetchApiArticle();
    }
  }, [page]);
  // 监听
  useEffect(() => {
    if (inViewPort && hasMore) {
      setLoadingEntry(true);
      setPage(page + 1);
      console.log('page', page);
    }
  }, [inViewPort]);

  return (
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
            <Affix offsetTop={top}>
              <div className={styles['row-right']}>
                <Card className='mb20 card-p10'>
                  <div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                  </div>
                </Card>
                <Card className='mb20 card-p10'>
                  <div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                  </div>
                </Card>
              </div>
            </Affix>
          </Col>
        </Row>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const [err, res] = await getApi(`${server}/api/index`);
  // console.log('pageindex', err, res);
  if (err) {
    return {
      props: {
        banner: [],
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
    },
  };
};

export default PageIndex;
