import React, { useState } from 'react';
import { Row, Col, Card, Affix, Anchor } from 'antd';
const { Link } = Anchor;

//
import { getNavi } from '@/fetchMdw/index';

const PageNavi = (props) => {
  const { navi } = props;
  const [top, setTop] = useState(80);

  return (
    <>
      <Row className='page-navi container'>
        <Col xs={24} sm={16} className='mb20 card-p0'>
          {navi.length &&
            navi.map((t) => (
              <Card key={t.cid} id={t.cid} title={t.name} size='small' className='mb20 card-p0'>
                <Row className='navi-ul'>
                  {t.articles.map((j) => (
                    <Col key={j.id} xs={12} sm={8} className='navi-links'>
                      <a href={j.link} target='_blank' rel='noopener noreferrer' className='item nowrap'>
                        {j.title}
                      </a>
                    </Col>
                  ))}
                </Row>
              </Card>
            ))}
        </Col>
        <Col xs={0} sm={8} className='card-p10 pl20'>
          <Affix offsetTop={top}>
            <Card className='page-navi-right'>
              <Anchor affix={false}>
                {navi.map((t) => (
                  <Link key={t.name} href={`#${t.cid}`} title={t.name} />
                ))}
              </Anchor>
            </Card>
          </Affix>
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const [err, res] = await getNavi();
  // console.log('pageindex', err, res);
  if (err) {
    return {
      props: {
        navi: [],
      },
    };
  }
  return {
    props: {
      navi: res,
    },
  };
};

export default PageNavi;
