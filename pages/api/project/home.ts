import { getProject, getProjectTreeJson } from 'fetch/index';

export default async (req, res) => {
  let { query } = req;
  const [err1, res1] = await getProjectTreeJson();
  if (!query.cid) {
    query.cid = res.data[0].id;
  }
  const [err2, res2] = await getProject(query);
  if (err1 || err2) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json([res1, res2]);
};
