import { getTreeAll } from 'fetch/index';

export default async (req, res) => {
  const { query } = req;
  const [errAll, resAll] = await getTreeAll(query);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};
