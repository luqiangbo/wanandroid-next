import { getAllSearch } from 'fetch/index';

export default async (req, res) => {
  const { query } = req;
  // console.log('api', query);
  const page = 0;
  const [errAll, resAll] = await getAllSearch(page, query.id);
  console.log('api', errAll, resAll);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};
