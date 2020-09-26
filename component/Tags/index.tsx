import React, { useState, useEffect } from 'react';
import { Card, Radio, Carousel } from 'antd';
import { find } from 'lodash';
//
//
const Tags = (props) => {
  const { toProps } = props;
  const [value, setValue] = useState(null);
  const [valueChildren, setValueChildren] = useState(null);
  const [list, setList] = useState([]);
  const [listChildren, setListChildren] = useState([]);
  useEffect(() => {
    const propsTrim = toProps.map((item) => {
      return { ...item, label: item.name, value: item.id };
    });
    setList(propsTrim);
  }, []);
  const onChange = (e) => {
    const value = e.target.value;
    const lucky = find(list, (t) => t.id === value);
    const { children } = lucky;
    const childrenTrim = children.map((item) => {
      return { ...item, label: item.name, value: item.id };
    });
    console.log('123', value, lucky);
    setListChildren(childrenTrim);
    setValue(value);
    setValueChildren(null);
  };
  const onChangeChildren = (e) => {
    const value = e.target.value;
    setValueChildren(value);
  };
  return (
    <>
      <Card className='card-p0 mb20 com-tags'>
        <Radio.Group options={list} onChange={onChange} value={value} optionType='button' buttonStyle='solid' />
      </Card>
      {listChildren.length > 0 ? (
        <Card className='card-p0 mb20 com-tags'>
          <Radio.Group options={listChildren} onChange={onChangeChildren} value={valueChildren} optionType='button' buttonStyle='solid' />
        </Card>
      ) : null}
    </>
  );
};
export default Tags;
