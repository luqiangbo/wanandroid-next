import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Pagination } from 'antd';
import { find } from 'lodash';
import classnames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
//
interface Props {
  datas: any[];
  curPage: number;
  total: number;
}
const ProjectList = ({ toProps }) => {
  const router = useRouter();
  const { page } = router.query;
  const onChange = (props) => {
    router.push(`/project?page=${props}`, undefined, { shallow: true });
  };
  return (
    <>
      <div className='componment-project-list'>
        <Row className='project'>
          {toProps.datas.map((item) => {
            return (
              <Col xs={12} sm={6} key={item.id} className={classnames('project-item')}>
                <div className='main'>
                  <div className='envelope'>
                    <img src={item.envelopePic} alt='' />
                  </div>
                  <div className='info'>
                    <div className='info-title'>{item.title}</div>
                    <div className='info-tags'>
                      {item.tags.map((tagsItem) => {
                        return <div key={tagsItem.name}>{tagsItem.name}</div>;
                      })}
                    </div>
                    <div className='info-item'>
                      <div className='view'>观看{item.visible}</div>
                      <div className='good'>赞{item.zan}</div>
                    </div>
                  </div>

                  <div className='user'>
                    <div className='resume'>
                      <div className='header'>
                        <img src='' alt='' />
                      </div>
                      <div className='name'>名字</div>
                    </div>
                    <div className='time'>{dayjs().from(dayjs(item.niceDate))}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className='mb20  componment-project-list-page'>
          <Pagination defaultCurrent={toProps.curPage + 1} total={toProps.total} showSizeChanger={false} onChange={onChange} />
        </div>
      </div>
    </>
  );
};
export default ProjectList;
