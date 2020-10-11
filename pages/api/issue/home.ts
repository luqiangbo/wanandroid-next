import { getIssueMore, getHotkey } from 'fetch/index';

export default async (req, res) => {
  const page = 0;
  console.log('api issue');
  const [err1, res1] = await getIssueMore(page);
  const [err2, res2] = await getHotkey();
  console.log('api issue', err1, res1);
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json([res1, res2]);
};
