import { getArticleList } from 'fetch/shop';

export default async (req, res) => {
  const { body, query, cookies } = req;
  console.log('errArticle', req);
  const page = 0;
  const [errArticle, resArticle] = await getArticleList(page);
  // console.log('api', errAll);
  if (errArticle) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(errArticle);
};
