import { getBanner } from 'fetch/shop';

export default async (req, res) => {
  console.log('body', req.body); // The request body
  console.log('query', req.query); // The url querystring
  console.log('cookies', req.cookies); // The passed cooki
  const [err1, res1] = await getBanner();
  console.log(err1, res1);
  res.json(res1);
  // res.end('Hello World');
};
