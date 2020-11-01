import { getTreeAll, getTreeJson } from 'fetchServe/index';

export default async (req, res) => {
  const [err1, res1] = await getTreeJson();
  const {
    query: { cid },
  } = req;
  const cidDefault = cid || res1[0].id;
  const [errAll, resAll] = await getTreeAll({ page: 0, cid: cidDefault });
  if (errAll) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json([...resAll, res1]);
};
