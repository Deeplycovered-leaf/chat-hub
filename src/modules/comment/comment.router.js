import Router from '@koa/router'
import { verify_auth, verify_permission } from '../../middleware'
import { comment_controller } from './comment.controller'

export const comment_router = new Router({ prefix: '/comment' })

comment_router.post('/', verify_auth, comment_controller.create)
comment_router.post('/reply', verify_auth, comment_controller.reply)
comment_router.get('/', comment_controller.query)
comment_router.get('/:id', comment_controller.find_one)
comment_router.patch('/:id', verify_auth, verify_permission('comment'), comment_controller.update)
comment_router.delete('/:id', verify_auth, verify_permission('comment'), comment_controller.delete)
