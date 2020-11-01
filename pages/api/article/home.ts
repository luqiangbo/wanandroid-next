import { getArticleAll } from 'fetchServe/index';

export default async (req, res) => {
  const page = 0;
  const [errAll, resAll] = await getArticleAll(page);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};
