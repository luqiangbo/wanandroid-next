export default function handle(req, res) {
  console.log('body', req.body); // The request body
  console.log('query', req.query); // The url querystring
  console.log('cookies', req.cookies); // The passed cooki
  res.json({ title: 'Hello World' });
  // res.end('Hello World');
}
