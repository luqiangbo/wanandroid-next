import { getTo, get, post, postTo } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => getTo('banner/json');
// 文章列表
export const getArticleList = (int, name = '') => {
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
// 搜索集合
export const getAllSearch = (int, name) => {
  return to(Promise.all([post(`article/query/${int}/json`, { k: name }), get(`hotkey/json`)]));
};
// 搜索page
export const postSearch = (int, name) => {
  return postTo(`article/query/${int}/json`, { k: name });
};
// 导航 page
export const getNavi = () => getTo(`navi/json`);
// 广场页面 集合
export const getArticleAll = (int) => {
  return to(Promise.all([get(`user_article/list/${int}/json`), get(`hotkey/json`)]));
};
// 广场页面 加载
export const getArticleMore = (int) => getTo(`user_article/list/${int}/json`);
// 问答页面 集合
export const getIssueAll = (int) => {
  return to(Promise.all([get(`wenda/list/${int}/json`), get(`hotkey/json`)]));
};
// 问答页面 加载
export const getIssueMore = (int) => getTo(`wenda/list/${int}/json`);
