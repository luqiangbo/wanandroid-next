// 中间层
import { getApi } from 'util/req';
import { server } from 'config/index';

// 首页
export const getIndex = () => getApi(`${server}/api/index`);
// 首页文章
export const getIndexEntry = (page) => getApi(`${server}/api/index/entry`, { page });
// 搜索热词
export const getIndexHotkey = () => getApi(`${server}/api/index/hotkey`);
// 搜索页面
export const getSearch = (id) => getApi(`${server}/api/search`, { id });
