const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()

const userRouter = new Router({ prefix: '/user' })
userRouter.get('/list', (ctx) => {
  ctx.body = 'user'
})
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running at http://localhost:8000')
})
