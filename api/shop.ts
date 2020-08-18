import { get } from './http';

export const apiList = (p) => get('http://rap2.taobao.org:38080/app/mock/1798/api/use', p);
