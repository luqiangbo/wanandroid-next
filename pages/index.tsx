import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Menu } from 'antd';
import { debounce } from 'lodash';
const { SubMenu } = Menu;
//
import styles from './index.module.scss';
import { getApi } from 'util/req';
import { getToBottom } from 'util/index';
import { server } from 'config/index';
import Entry from 'component/Entry';
import Banner from 'component/Banner';
//
const PageIndex = ({ works, banner }) => {
  const apiArticle = async () => {
    const [err, res] = await getApi(`${server}/api/index/entry`, { page: '456' });
    console.log(err, res);
  };
  const onScroll = () => {
    const toBottom = getToBottom();
    if (3 < toBottom && toBottom < 10) {
      console.log(toBottom);
      apiArticle();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', debounce(onScroll, 2000));
    return () => {
      window.addEventListener('scroll', debounce(onScroll, 2000));
    };
  }, []);
  return (
    <>
      <div className="container">
        <Row>
          <Col xs={24} sm={16} className="mb20">
            <Banner toProps={banner} />
            <Entry toProps={works} />
          </Col>
          <Col xs={24} sm={8}>
            <div className={styles['row-right']}>
              <Card className="mb20 card-p10">
                <div>
                  <div>123</div>
                  <div>123</div>
                  <div>123</div>
                  <div>123</div>
                </div>
              </Card>
              <Card className="mb20 card-p10">
                <div>
                  <div>123</div>
                  <div>123</div>
                  <div>123</div>
                  <div>123</div>
                </div>
              </Card>
            </div>
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
