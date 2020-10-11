import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Radio, Carousel } from 'antd';
import { find } from 'lodash';
import classnames from 'classnames';
//
const ProjectLabel = ({ toProps }) => {
  const [action, setAction] = useState(toProps[0].id);
  return (
    <>
      <Card className='componment-project-label'>
        <div className='course-nav'>
          {toProps.map((item) => {
            return (
              <div
                key={item.id}
                className={classnames('course-nav-item', { on: item.id === 294 })}
                dangerouslySetInnerHTML={{ __html: item.name }}></div>
            );
          })}
        </div>
      </Card>
    </>
  );
};
export default ProjectLabel;
