import { getNavi } from 'fetchServe/index';

export default async (req, res) => {
  const [errAll, resAll] = await getNavi();
  // console.log('api', errAll);
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(resAll);
};
