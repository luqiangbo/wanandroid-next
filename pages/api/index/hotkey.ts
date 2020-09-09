import { getHotkey } from 'fetch/index';

export default async (req, res) => {
  const [err1, res1] = await getHotkey();
  if (err1) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(res1);
};
