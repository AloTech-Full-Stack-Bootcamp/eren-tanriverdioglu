const Koa = require('koa');
const Pug = require('koa-pug');
const Router = require('koa-router');
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path');

const app = new Koa();
const router = new Router();
const date = new Date();
const port = process.env.PORT || 5000;

const pug = new Pug({
  viewPath: path.resolve(__dirname, 'views'),
  locals: {
    siteName: 'AloTech Full-Stack Bootcamp - Week 1 Homework 4'
  },
  app: app // Binding `ctx.render()`, equals to pug.use(app)
});

// serve static files
app.use(mount('/static', serve('./static')));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${date.toLocaleTimeString()} / ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// router
router
  .get('/', async ctx => {
    await ctx.render('index')
  })
  .get('/about', async ctx => {
    await ctx.render('about')
  })
  .get('/contact', async ctx => {
    await ctx.render('contact')
  })

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
