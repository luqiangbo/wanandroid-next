import { getServeTo, getServe, postServe, postServeTo } from 'util/req';
import { to } from 'util/index';
// 轮播
export const getBanner = () => getServeTo('banner/json');
// 文章列表
export const getArticleList = ({ page, name = '' }) => {
  if (name) {
    return getServeTo(`article/list/${page}/json`, { k: name });
  } else {
    return getServeTo(`article/list/${page}/json`);
  }
};
// 集合
export const getAllIndex = (page) => {
  return to(Promise.all([getServe('banner/json'), getServe(`article/list/${page}/json`), getServe(`hotkey/json`)]));
};
// 搜索热词
export const getHotkey = () => getServeTo(`hotkey/json`);
// 搜索集合
export const getAllSearch = ({ page, name }) => {
  return to(Promise.all([postServe(`article/query/${page}/json`, { k: name }), getServe(`hotkey/json`)]));
};
// 搜索page
export const postSearch = ({ page, name }) => {
  return postServeTo(`article/query/${page}/json`, { k: name });
};
// 导航 page
export const getNavi = () => getServeTo(`navi/json`);
// 广场页面 集合
export const getArticleAll = (page) => {
  return to(Promise.all([getServe(`user_article/list/${page}/json`), getServe(`hotkey/json`)]));
};
// 问答页面 集合
export const getIssueAll = (page) => {
  return to(Promise.all([getServe(`wenda/list/${page}/json`), getServe(`hotkey/json`)]));
};
// 问答页面 加载
export const getIssueMore = (page) => getServeTo(`wenda/list/${page}/json`);
//
// 体系页面 集合
export const getTreeAll = ({ page = 0, cid = 60 }) => {
  return to(Promise.all([getServe(`article/list/${page}/json`, { cid }), getServe(`hotkey/json`)]));
};
export const getTreeJson = () => {
  return getServeTo(`tree/json`);
};
export const getArticleQuery = (params) => {
  const { cid, page } = params;
  return getServeTo(`user_article/list/${page}/json?cid=${cid}`);
};
// 4.1 项目分类
export const getProjectTreeJson = () => getServeTo(`project/tree/json`);
// 4.2 项目列表数据
export const getProject = (params) => {
  const { page, cid } = params;
  return getServeTo(`project/list/${page}/json?cid=${cid}`);
};
// 5.1 登录
export const postLogin = (params) => {
  // console.log('登录', params);
  return postServeTo(`user/login`, params);
};
