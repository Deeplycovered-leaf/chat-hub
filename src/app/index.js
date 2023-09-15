import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { register_routes } from '../modules'

export const app = new Koa()

app.use(bodyParser())

register_routes(app)
