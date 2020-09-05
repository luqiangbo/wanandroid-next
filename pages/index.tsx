import React, { useState } from 'react';
import Link from 'next/link';
import { Row, Col, Card, Menu, Button, message, Carousel } from 'antd';
//
import { getBanner } from 'fetch/shop';
const { SubMenu } = Menu;
const PageIndex = ({ data, banner, listUser }) => {
  const [current, setCurrent] = useState('1');
  function onMenu(e) {
    setCurrent((t) => e.key);
  }

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
                  {banner &&
                    banner.list.length &&
                    banner.list.map((t, i) => {
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
              {listUser.map((t) => (
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

export async function getServerSideProps() {
  const isBrowser = process.browser;
  const [err, res] = await getBanner();
  // console.log(res);
  if (err) {
    if (isBrowser) {
      message.error('err');
    }
    return {
      props: {
        data: 'err',
        listUser: [],
        banner: {
          list: [],
        },
      },
    };
  }
  if (isBrowser) {
    message.success('成功');
  }
  return {
    props: {
      data: '123',
      listUser: [
        { id: 1, name: 'dfsdfldsf' },
        { id: 2, name: 'dfsf' },
        { id: 3, name: 'dfldsf' },
      ],
      banner: {
        list: res,
      },
    },
  };
}

export default PageIndex;
