import axios from 'axios'; // 引入axios
import QS from 'qs';

axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.error('错误', error);
  },
);

export const get = (url, params) => {
  const pro = new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
  return pro.then((res) => [null, res]).catch((err) => [err, null]);
};

export const post = (url, params) => {
  const pro = new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
  return pro.then((res) => [null, res]).catch((err) => [err, null]);
};
