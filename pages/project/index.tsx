import React, { useState, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
//
import { getProject } from '@/fetchMdw/index';
import CPPLabel from '@/components/Pages/Project/Label';
import CPPjectList from '@/components/Pages/Project/List';
//
const PageArticle = ({ label, project }) => {
  return useObserver(() => (
    <>
      <div className='container'>
        <CPPLabel toProps={label}></CPPLabel>
        <CPPjectList toProps={project}></CPPjectList>
      </div>
    </>
  ));
};

export const getServerSideProps = async ({ query }) => {
  //
  const [err, res] = await getProject({ page: 1, cid: 294 });
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
