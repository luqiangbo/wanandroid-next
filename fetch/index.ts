import { getTo, get, post, postTo } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => getTo('banner/json');
// 文章列表
export const getArticleList = ({ page, name = '' }) => {
  if (name) {
    return getTo(`article/list/${page}/json`, { k: name });
  } else {
    return getTo(`article/list/${page}/json`);
  }
};
// 集合
export const getAllIndex = (page) => {
  return to(Promise.all([get('banner/json'), get(`article/list/${page}/json`), get(`hotkey/json`)]));
};
// 搜索热词
export const getHotkey = () => getTo(`hotkey/json`);
// 搜索集合
export const getAllSearch = ({ page, name }) => {
  return to(Promise.all([post(`article/query/${page}/json`, { k: name }), get(`hotkey/json`)]));
};
// 搜索page
export const postSearch = ({ page, name }) => {
  return postTo(`article/query/${page}/json`, { k: name });
};
// 导航 page
export const getNavi = () => getTo(`navi/json`);
// 广场页面 集合
export const getArticleAll = (page) => {
  return to(Promise.all([get(`user_article/list/${page}/json`), get(`hotkey/json`)]));
};
// 问答页面 集合
export const getIssueAll = (page) => {
  return to(Promise.all([get(`wenda/list/${page}/json`), get(`hotkey/json`)]));
};
// 问答页面 加载
export const getIssueMore = (page) => getTo(`wenda/list/${page}/json`);
//
// 体系页面 集合
export const getTreeAll = ({ page = 0, cid = 60 }) => {
  return to(Promise.all([get(`article/list/${page}/json`, { cid }), get(`hotkey/json`)]));
};
export const getTreeJson = () => {
  return getTo(`tree/json`);
};
export const getArticleQuery = (params) => {
  const { cid, page } = params;
  return getTo(`user_article/list/${page}/json?cid=${cid}`);
};
// 4.1 项目分类
export const getProjectTreeJson = () => getTo(`project/tree/json`);
// 4.2 项目列表数据
export const getProject = (params) => {
  const { page, cid } = params;
  return getTo(`project/list/${page}/json?cid=${cid}`);
};
