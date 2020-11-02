import axios from 'axios'; // 引入axios
import QS from 'qs';

//
import { to } from 'util/index';
//
const queryServe = axios.create({
  baseURL: 'https://www.wanandroid.com/',
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [(data) => QS.stringify(data)],
});

queryServe.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200
    const { data, status, headers, request } = response;
    // console.log('query', headers, request.path);
    if (status === 200) {
      if (data.errorCode !== 0) {
        return Promise.reject(data);
      } else {
        if (request.path === '/user/login') {
          // 登录
          return {
            ...data.data,
            'set-cookie': headers['set-cookie'],
          };
        }
        return data.data;
      }
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
// getTo
export const getServeTo = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      queryServe({
        method: 'get',
        url,
        params,
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
// get
export const getServe = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    queryServe({
      method: 'get',
      url,
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// postTo
export const postServeTo = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      queryServe({
        method: 'post',
        url,
        data: params,
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
export const postServe = (url, params = {}) => {
  new Promise((resolve, reject) => {
    queryServe({
      method: 'post',
      url,
      data: params,
    })
      .then((res) => {
        // console.log('req,post', res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const requestServeTo = (config) => {
  return to(
    new Promise((resolve, reject) => {
      queryServe(config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
// api 中间层 封装
const queryMdw = axios.create({
  timeout: 10 * 1000,
});
queryMdw.interceptors.response.use(
  (response) => {
    // console.log('util req', response);
    // 如果返回的状态码为200
    const { data, status } = response;
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
export const getMdwTo = (url, params = {}) => {
  return to(
    new Promise((resolve, reject) => {
      queryMdw({
        method: 'get',
        url,
        params,
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
// getApi
export const getMdw = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    queryMdw({
      method: 'get',
      url,
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// postApiTo
export const postMdwTo = (url, params) => {
  return to(
    new Promise((resolve, reject) => {
      queryMdw({
        method: 'post',
        url,
        data: params,
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
export const requestMdwTo = (config) => {
  return to(
    new Promise((resolve, reject) => {
      queryMdw(config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  );
};
