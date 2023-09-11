import Router from '@koa/router'
import { user_controller } from '../controller'
import { hash_password, verify_user } from '../middleware'

export const user_router = new Router({ prefix: '/user' })

user_router.post('/', user_controller.query)
user_router.post('/signup', verify_user, hash_password, user_controller.create)
user_router.get('/avatar/:id', user_controller.get_avatar)
