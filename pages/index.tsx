import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Menu, Spin, Affix } from 'antd';
import { useWindowScroll } from 'react-use';
const { SubMenu } = Menu;
//
import styles from './index.module.scss';
import { getApi } from 'util/req';
import { server } from 'config/index';
import Entry from 'component/Entry';
import Banner from 'component/Banner';
//
const PageIndex = ({ works, banner }) => {
  const listMore = useRef(null);
  const [top, setTop] = useState(80);
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { x, y } = useWindowScroll();
  //
  const fetchApiArticle = async () => {
    const [err, res] = await getApi(`${server}/api/index/entry`, { page });
    setLoadingEntry(false);
    console.log(err, res);
  };
  //
  // useEffect(() => {
  //   if (loadingEntry) {
  //     fetchApiArticle();
  //   }
  // }, [page]);
  //
  const onLoadMore = () => {
    setPage((t) => t + 1);
    setLoadingEntry(true);
    console.log(page);
  };
  useEffect(() => {
    // 定义观察
    // intiateScrollObserver();
    return () => {
      // 放弃观察
      // resetObservation();
    };
  });

  return (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <Banner toProps={banner} />
            <Spin spinning={loadingEntry}>
              <Entry toProps={works} />
              <div
                ref={listMore}
                data-shou={page}
                data-shou1={page}
                data-shou2={page}
                data-shou3={page}
                data-shou4={page}
                data-shou5={page}
                data-shou6={page}
                data-shou7={page}
                data-shou8={page}>
                更多
              </div>
            </Spin>
          </Col>
          <Col xs={0} sm={8}>
            <Affix offsetTop={top}>
              <div className={styles['row-right']}>
                <Card className='mb20 card-p10'>
                  <div>
                    <div>x: {x}</div>
                    <div>y: {y}</div>
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
