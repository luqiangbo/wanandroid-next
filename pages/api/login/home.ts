import { postLogin } from 'fetchServe/index';

export default async (req, res) => {
  const { query } = req;
  const [err1, res1] = await postLogin(query);
  if (err1) {
    res.status(200).json(err1);
    return;
  }
  res.setHeader('set-cookie', res1['set-cookie']);
  res.status(200).json(res1);
};
