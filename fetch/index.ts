import { getTo, get, post } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => getTo('banner/json');
// 文章列表
export const getArticleList = (int, name) => {
  if (name) {
    return getTo(`article/list/${int}/json`, { k: name });
  } else {
    return getTo(`article/list/${int}/json`);
  }
};
// 集合
export const getAllIndex = (int) => {
  return to(Promise.all([get('banner/json'), get(`article/list/${int}/json`), get(`hotkey/json`)]));
};
// 搜索热词
export const getHotkey = () => getTo(`hotkey/json`);
/// 搜索页面
// 搜索集合
export const getAllSearch = (int, name) => {
  return to(Promise.all([post(`article/query/${int}/json`, { k: name }), get(`hotkey/json`)]));
};
