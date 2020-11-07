// 中间层
import { getMdwTo, requestMdwTo } from 'util/req';
import { server } from 'config/index';

// 首页
export const getIndex = () => getMdwTo(`${server}/api/index/home`);
// 首页文章
export const getIndexEntry = (page) => getMdwTo(`${server}/api/index/entry`, { page });
// 搜索热词
export const getIndexHotkey = () => getMdwTo(`${server}/api/index/hotkey`);
// 搜索页面
export const getSearch = (id) => getMdwTo(`${server}/api/search/home`, { id });
// 搜索页面
export const getSearchMore = (obj) => getMdwTo(`${server}/api/search/more`, obj);
// 导航页面
export const getNavi = () => getMdwTo(`${server}/api/navi/home`);

// 广场
export const getArticle = () => getMdwTo(`${server}/api/article/home`);
//
export const getArticleQuery = (params) => getMdwTo(`${server}/api/article/more`, params);
// 问答
export const getIssue = () => getMdwTo(`${server}/api/issue/home`);
// 问答
export const getIssueGoods = (obj) => getMdwTo(`${server}/api/issue/goods`, obj);
// 问答
export const getIssueMore = (page) => getMdwTo(`${server}/api/issue/more`, { page });
// 体系
export const getTree = (params) => getMdwTo(`${server}/api/tree/home`, params);
// 项目
export const getProject = (params) => getMdwTo(`${server}/api/project/home`, params);
// login
export const getLogin = (params) => getMdwTo(`${server}/api/login/home`, params);
// 注册
export const getRegister = (params) => getMdwTo(`${server}/api/login/register`, params);
// 个人中心
export const getCoinMdw = ({ headers }) =>
  requestMdwTo({
    method: 'get',
    url: `${server}/api/coin/home`,
    data: {},
    headers,
  });
