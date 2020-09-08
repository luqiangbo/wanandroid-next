import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Row, Col, Card, Menu, Button, message, Carousel } from 'antd';
const { SubMenu } = Menu;
//
import { getApi } from 'util/req';
import { server } from 'config/index';
//
const PageIndex = ({ works, banner }) => {
  const [current, setCurrent] = useState('1'); // nav

  const onMenu = (e) => {
    setCurrent((t) => e.key);
  };
  return (
    <>
      <div className="container">
        <div className="mb20 ">
          <Menu mode="horizontal" onClick={onMenu} selectedKeys={[current]} className="pb10">
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">广场</Menu.Item>
            <Menu.Item key="3">导航</Menu.Item>
            <Menu.Item key="4">广场</Menu.Item>
            <Menu.Item key="5">体系</Menu.Item>
            <Menu.Item key="6">项目</Menu.Item>
            <Menu.Item key="7">公众号</Menu.Item>
            <Menu.Item key="8">项目分类</Menu.Item>
          </Menu>
        </div>
        <Row>
          <Col xs={24} sm={16} className="mb20">
            <Card className="card-p0 mb20">
              <div className="index-banner">
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
            <div className="pl20">
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
