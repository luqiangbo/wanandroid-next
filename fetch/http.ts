import axios from 'axios'; // 引入axios
import QS from 'qs';
import { message } from 'antd';

import { to } from 'util/index';

const query = axios.create({
  baseURL: 'https://www.wanandroid.com/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

query.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200
    const { data, status } = response;
    if (status === 200) {
      if (data.errorCode !== 0) {
        return Promise.reject(data.errorCode);
      } else {
        return data.data;
      }
    } else {
      return Promise.reject(status);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
// get
export const get = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      query
        .get(url, { params })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
//
export const gets = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    query
      .get(url, { params })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// post
export const post = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      query
        .post(url, QS.stringify(params))
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
