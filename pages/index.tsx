import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Row, Col, Card, Menu, Button, message, Carousel } from 'antd';
const { SubMenu } = Menu;
//
import { to } from 'util/index';
import { server } from 'config/index';
//
const PageIndex = (props) => {
  const [current, setCurrent] = useState('1'); // nav
  const [banner, setBanner] = useState([]); // banner
  const [works, setWorks] = useState([]); // banner
  const onMenu = (e) => {
    setCurrent((t) => e.key);
  };
  //
  // useEffect(() => {
  //   const doapi = async () => {
  //     const [err, res] = await to(axios.get(`/api/index`));
  //     setBanner(res.data);
  //     setWorks([
  //       { id: 1, name: 'dfsdfldsf' },
  //       { id: 2, name: 'dfsf' },
  //       { id: 3, name: 'dfldsf' },
  //     ]);
  //   };
  //   doapi();
  // }, []);
  //
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
                  {props.banner.length &&
                    props.banner.map((t, i) => {
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
              {props.works.length &&
                props.works.map((t) => (
                  <div key={t.id} className="cp">
                    <Link href={`/detail/${t.id}`}>
                      <span>{t.name}</span>
                    </Link>
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

export async function getServerSideProps(context) {
  // const isBrowser = process.browser;
  // console.log(res);
  const res = await fetch(`${server}/api/index`);
  const data = await res.json();
  return {
    props: {
      data: '123',
      works: [
        { id: 1, name: 'dfsdfldsf' },
        { id: 2, name: 'dfsf' },
        { id: 3, name: 'dfldsf' },
      ],
      banner: data || [],
      // banner: res.data,
    },
  };
}

export default PageIndex;
