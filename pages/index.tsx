import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Menu, Button, message, Carousel } from 'antd';
const { SubMenu } = Menu;
//
import styles from './index.module.scss';
import { getApi } from 'util/req';
import { server } from 'config/index';
//
const PageIndex = ({ works, banner }) => {
  return (
    <>
      <div className="container">
        <Row>
          <Col xs={24} sm={16} className="mb20">
            <Card className="card-p0 mb20">
              <div className={styles.banner}>
                <Carousel autoplay adaptiveHeight={true}>
                  {banner.length &&
                    banner.map((t, i) => {
                      return (
                        <div key={i}>
                          <img src={t.imagePath} alt="" />
                        </div>
                      );
                    })}
                </Carousel>
              </div>
            </Card>
            <Card className="card-p0">
              {works.datas.map((t) => (
                <div key={t.id} className="cp">
                  <a href={t.link} target="_blank" rel="noopener noreferrer">
                    <span>{t.title}</span>
                  </a>
                </div>
              ))}
              <div></div>
            </Card>
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
