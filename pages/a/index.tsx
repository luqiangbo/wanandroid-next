import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Divider } from 'antd';
import axios from 'axios';

import { apiList } from '../../api/shop';

const PageIndex = (props) => {
  // console.log(props);
  const [data, setData] = useState(0);
  const [list, setList] = useState([]);
  const [listName, setListName] = useState([]);
  useEffect(() => {
    setData((t) => t + 1);
    setList(props.listPro);
    setListName(props.query);
  }, [props]);
  return (
    <>
      <div className="main">a路由</div>
      <div>
        {list.length > 0 &&
          list.map((t) => {
            return <div key={t.id}>{t.title}</div>;
          })}
      </div>
      分割线
    </>
  );
};
export async function getServerSideProps(context) {
  const { query } = context;
  const [err1, res1] = await apiList(1);
  console.log('context', query, res1);
  if (err1) return;
  return {
    props: {
      listPro: [...res1.list, ...query.list],
    },
  };
}

export default PageIndex;
