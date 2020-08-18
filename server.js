const Koa = require('koa');
const Next = require('next');
const Router = require('koa-router');
const day = require('dayjs');

// const home = require('./server/routers/home');

// 创建一个app，并指定为开发状态
// console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
// 创建redis client
const handle = app.getRequestHandler();

// 等pages下面的所有页面编译完成之后启动服务，响应请求
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  // 放前面能打印出日志 监听get路由

  router.get('/a', async (ctx) => {
    const req_time = day().format('YYYY-MM-DD HH:mm:ss');
    console.log(`${ctx.method}___${ctx.url}___${req_time}`);
    const { req, res, query } = ctx;
    const list = [{ id: 88, title: '123' }];
    const params = { ...query, list };
    await app.render(req, res, '/a', params);
    ctx.respond = false;
  });
  // router.get('*', async (req, res) => {
  //   await handle(req, res);
  // });

  server.use(router.routes());
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    await next();
  });
  // 监听端口
  server.listen(8080, '127.0.0.1', () => {
    console.log('koa server listening on 8080');
  });
});
