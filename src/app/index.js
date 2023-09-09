import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { register_routes, sign_in_router, user_router } from '../router'

export const app = new Koa()

app.use(bodyParser())

register_routes(app)
