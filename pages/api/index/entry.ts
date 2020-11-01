import { getArticleList } from 'fetchServe/index';

export default async (req, res) => {
  const { body, query, cookies } = req;
  const {
    query: { page },
  } = req;
  const [errArticle, resArticle] = await getArticleList({ page: page * 1, name: '' });
  if (errArticle) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resArticle);
};
