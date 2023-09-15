import Router from '@koa/router'
import { hash_password, verify_user } from '../../middleware'
import { user_controller } from './user.controller'

export const user_router = new Router({ prefix: '/user' })

user_router.post('/', user_controller.query)
user_router.post('/signup', verify_user, hash_password, user_controller.create)
user_router.get('/avatar/:id', user_controller.get_avatar)
