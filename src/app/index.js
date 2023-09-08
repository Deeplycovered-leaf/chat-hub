import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { sign_in_router, user_router } from '../router'

export const app = new Koa()

app.use(bodyParser())
app.use(user_router.routes())
app.use(user_router.allowedMethods())
app.use(sign_in_router.routes())
app.use(sign_in_router.allowedMethods())
