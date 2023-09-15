import Router from '@koa/router'
import { verify_sign } from '../../middleware'
import { sign_in_controller } from './sign-in.controller'

export const sign_in_router = new Router({ prefix: '/signin' })

sign_in_router.post('/', verify_sign, sign_in_controller.sign_in)
