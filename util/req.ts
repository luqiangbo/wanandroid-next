import axios from 'axios'; // 引入axios
import QS from 'qs';
//
import { to } from 'util/index';
//
const query = axios.create({
  baseURL: 'https://www.wanandroid.com/',
  timeout: 10 * 1000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  // },
  // transformRequest: [(data) => QS.stringify(data)], // 对 data 进行任意转换处理
});

query.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200
    const { data, status } = response;
    // console.log('query', response.data, response.status);
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
// getTo
export const getTo = (url, params = {}) => {
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
// get
export const get = (url, params = {}) => {
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
// postTo
export const postTo = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      query
        .post(url, {
          data: QS.stringify(params),
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
// post
export const post = (url, params = {}) => {
  console.log('req', url, params);
  new Promise((resolve, reject) => {
    query
      .post(url, {
        data: QS.stringify(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .then((res) => {
        console.log('req,post', res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// api 中间层 封装
const queryApi = axios.create({
  timeout: 10 * 1000,
});
queryApi.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200
    const { data, status } = response;
    // console.log('queryApi', data);
    if (status === 200) {
      return data;
    } else {
      return Promise.reject(status);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
// getApiTo
export const getApiTo = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      queryApi
        .get(url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
// getApi
export const getApi = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    queryApi
      .get(url, { params })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// postApiTo
export const postApiTo = (url, params) => {
  return to(
    new Promise((resolve, reject) => {
      queryApi
        .post(url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
