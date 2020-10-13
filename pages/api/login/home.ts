import { postLogin } from 'fetch/index';

export default async (req, res) => {
  const { query } = req;
  const [err1, res1] = await postLogin(query);
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(res1);
};
