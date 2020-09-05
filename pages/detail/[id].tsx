import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Divider } from 'antd';

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  // id
  useEffect(() => {
    id &&
      fetch(`/api/detail/${id}`)
        .then((res) => {
          const a = res.json();
          console.log(a);
          return a;
        })
        .catch((err) => {
          console.log(err);
        });
  }, [id]);
  //
  return (
    <div>
      <div>123</div>
    </div>
  );
}
