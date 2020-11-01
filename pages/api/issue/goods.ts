import { getIssueMore, getHotkey } from 'fetchServe/index';

export default async (req, res) => {
  const {
    query: { page },
  } = req;
  const [err1, res1] = await getIssueMore(page - 1 || 0);
  const [err2, res2] = await getHotkey();
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json([res1, res2]);
};
