import { postSearch } from 'fetch/index';

export default async (req, res) => {
  const { query } = req;
  // console.log('api more', query);
  const [err1, res1] = await postSearch(query.page, query.id);
  // console.log('api more', err1, res1);
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(res1);
};
