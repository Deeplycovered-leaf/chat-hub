import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { user_router } from '../router'

export const app = new Koa()

app.use(bodyParser())
app.use(user_router.routes())
app.use(user_router.allowedMethods())
