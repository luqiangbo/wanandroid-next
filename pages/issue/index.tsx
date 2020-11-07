import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import { Row, Col, Pagination, Card } from 'antd';
import { useUpdateEffect } from 'ahooks';
//
import { getIssueGoods, getIssueMore } from '@/fetchMdw/index';
import Entry from 'components/Entry';
import CRight from '@/components/Right';
import CRCSearch from '@/components/Right/components/Search';
import CRCHotkey from '@/components/Right/components/Hotkey';
import CRCUser from '@/components/Right/components/User';
//
const PageIssue = ({ works, hotkey }) => {
  const router = useRouter();
  const { page } = router.query;

  const [worksUpdate, setWorksUpdate] = useState({ ...works });

  const onChange = (props) => {
    router.push(`/issue?page=${props}`, undefined, { shallow: true });
  };
  const onMore = async () => {
    const [err, res] = await getIssueMore(page);
    setWorksUpdate(res);
  };
  useUpdateEffect(() => {
    onMore();
  }, [page]);
  //
  return useObserver(() => (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <div className='mb20'>
              <Entry toProps={worksUpdate} />
            </div>
            <Card size='small' className='mb20 card-p10'>
              <Pagination defaultCurrent={worksUpdate.curPage + 1} total={worksUpdate.total} showSizeChanger={false} onChange={onChange} />
            </Card>
          </Col>
          <Col xs={0} sm={8}>
            <CRight>
              <CRCSearch />
              <CRCHotkey toProps={hotkey} />
              {/* <RightUser /> */}
            </CRight>
          </Col>
        </Row>
      </div>
    </>
  ));
};

export const getServerSideProps = async (context) => {
  const { query } = context;
  //
  const [err, res] = await getIssueGoods(query);
  if (err) {
    return {
      props: {
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
      works: res[0],
      hotkey: res[1],
    },
  };
};

export default PageIssue;
