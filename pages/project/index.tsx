import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spin } from 'antd';
import { useObserver } from 'mobx-react';
//
import { getProject } from '@/fetchMdw/index';
import ProjectLabel from '@/component/ProjectLabel';
import ProjectList from '@/component/ProjectList';
//
const PageArticle = ({ label, project }) => {
  return useObserver(() => (
    <>
      <div className='container'>
        <ProjectLabel toProps={label}></ProjectLabel>
        <ProjectList toProps={project}></ProjectList>
      </div>
    </>
  ));
};

export const getServerSideProps = async ({ query }) => {
  //
  // console.log('p project', query);
  const [err, res] = await getProject({ page: 1, cid: 294 });
  // console.log('p project', err, res);
  if (err) {
    return {
      props: {
        label: [],
        project: {
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
      label: res[0],
      project: res[1],
    },
  };
};

export default PageArticle;
