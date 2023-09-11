import Router from '@koa/router'
import { verify_auth, verify_avatar } from '../middleware'
import { file_controller, moment_controller } from '../controller'

export const upload_router = new Router({ prefix: '/upload' })

upload_router.post('/avatar', verify_auth, verify_avatar, file_controller.create)
