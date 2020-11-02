import { reqCoin } from 'fetchServe/index';

export default async (req, res) => {
  const { cookies, query, body, headers } = req;
  const [err1, res1] = await reqCoin({ headers });
  // console.log('api userinfo', err1, res1);
  if (err1) {
    // 重定向
    // res.setPreviewData({});
    // res.writeHead(307, { Location: `/` });
    // res.end();
    // return;

    // 先页面重定向吧
    res.status(200).json(err1);
    res.end();
    return;
  }
  res.status(200).json(res1);
};
