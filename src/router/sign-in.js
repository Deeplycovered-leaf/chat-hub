import Router from '@koa/router'
import { sign_in_controller } from '../controller'
import { verify_sign } from '../middleware'

export const sign_in_router = new Router({ prefix: '/signin' })

sign_in_router.post('/', verify_sign, sign_in_controller.sign_in)
