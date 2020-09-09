import { get, getCrude } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => get('banner/json');
// 文章列表
export const getArticleList = (int) => get(`article/list/${int}/json`);
// 集合
export const getAllIndex = (int) => {
  return to(Promise.all([getCrude('banner/json'), getCrude(`article/list/${int}/json`)]));
};
// 文章列表
export const getHotkey = () => get(`hotkey/json`);
