import { getArticleList } from 'fetch/shop';

export default async (req, res) => {
  const { body, query, cookies } = req;
  const {
    query: { page },
  } = req;
  console.log('errArticle', query);
  const [errArticle, resArticle] = await getArticleList(page * 1);
  console.log('api', errArticle, resArticle);
  if (errArticle) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(errArticle);
};
