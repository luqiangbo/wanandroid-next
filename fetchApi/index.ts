// 中间层
import { getApiTo } from 'util/req';
import { server } from 'config/index';

// 首页
export const getIndex = () => getApiTo(`${server}/api/index`);
// 首页文章
export const getIndexEntry = (page) => getApiTo(`${server}/api/index/entry`, { page });
// 搜索热词
export const getIndexHotkey = () => getApiTo(`${server}/api/index/hotkey`);
// 搜索页面
export const getSearch = (id) => getApiTo(`${server}/api/search`, { id });
