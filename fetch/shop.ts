import { get } from './http';
// 轮播
export const getBanner = () => get('banner/json');

export const getCurList = (int) => get(`article/list/${int}/json`);

export const getAllIndex = (int) => {
  return Promise.all([get('banner/json'), get(`article/list/${int}/json`)]);
};
