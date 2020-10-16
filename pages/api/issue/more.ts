import { getArticleList } from 'fetch/index';

export default async (req, res) => {
  const {
    query: { page },
  } = req;
  const [err1, res1] = await getArticleList({ page: page * 1 });
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(res1);
};
