import { postSearch, getHotkey } from 'fetch/index';

export default async (req, res) => {
  const { query } = req;
  // console.log('api', query);
  const page = 0;
  const [err1, res1] = await postSearch({ page, name: query.id });
  const [err2, res2] = await getHotkey();
  // console.log('api', errAll, resAll);
  if (err1 || err2) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json([res1, res2]);
};
