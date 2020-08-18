/**
 * 首页
 */
const day = require('dayjs');

module.exports = (router, app) => {
  return router.get('/a', async (ctx) => {
    const req_time = day().format('YYYY-MM-DD HH:mm:ss');
    console.log(`${ctx.method}___${ctx.url}___${req_time}`);
    const { req, res, query } = ctx;
    const list = [{ id: 88, title: '123' }];
    const params = { ...query, list };
    await app.render(req, res, '/a', params);
    ctx.respond = false;
  });
};
