import { getAllIndex } from 'fetch/index';

export default async (req, res) => {
  const { body, query, cookies } = req;
  const page = 0;
  const [errAll, resAll] = await getAllIndex(page);
  // console.log('api', errAll);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};
