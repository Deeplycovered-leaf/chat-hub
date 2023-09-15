import Router from '@koa/router'
import { verify_auth } from '../../middleware'
import { label_controller } from './label.controller'

export const label_router = new Router({ prefix: '/label' })

label_router.post('/', verify_auth, label_controller.create)

// label_router.patch('/:id', verify_auth, verify_permission('comment'), label_controller.update)
// label_router.delete('/:id', verify_auth, verify_permission('comment'), label_controller.delete)
