// 中间层
import { getMiddlewareTo, requestMiddlewareTo } from 'util/req';
import { server } from 'config/index';

// 首页
export const getIndex = () => getMiddlewareTo(`${server}/api/index/home`);
// 首页文章
export const getIndexEntry = (page) => getMiddlewareTo(`${server}/api/index/entry`, { page });
// 搜索热词
export const getIndexHotkey = () => getMiddlewareTo(`${server}/api/index/hotkey`);
// 搜索页面
export const getSearch = (id) => getMiddlewareTo(`${server}/api/search/home`, { id });
// 搜索页面
export const getSearchMore = (obj) => getMiddlewareTo(`${server}/api/search/more`, obj);
// 导航页面
export const getNavi = () => getMiddlewareTo(`${server}/api/navi/home`);

// 广场
export const getArticle = () => getMiddlewareTo(`${server}/api/article/home`);
//
export const getArticleQuery = (params) => getMiddlewareTo(`${server}/api/article/more`, params);
// 问答
export const getIssue = () => getMiddlewareTo(`${server}/api/issue/home`);
// 问答
export const getIssueGoods = (obj) => getMiddlewareTo(`${server}/api/issue/goods`, obj);
// 问答
export const getIssueMore = (page) => getMiddlewareTo(`${server}/api/issue/more`, { page });
// 体系
export const getTree = (params) => getMiddlewareTo(`${server}/api/tree/home`, params);
// 项目
export const getProject = (params) => getMiddlewareTo(`${server}/api/project/home`, params);
// login
export const getLogin = (params) => getMiddlewareTo(`${server}/api/login/home`, params);
// 个人中心
export const getUser = ({ headers }) =>
  requestMiddlewareTo({
    method: 'get',
    url: `${server}/api/user/home`,
    data: {},
    headers,
  });
