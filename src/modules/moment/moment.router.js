import Router from '@koa/router'
import { verify_auth, verify_label_exists, verify_permission } from '../../middleware'
import { moment_controller } from './moment.controller'

export const moment_router = new Router({ prefix: '/moment' })

moment_router.post('/', verify_auth, moment_controller.create)
moment_router.get('/', moment_controller.query)
moment_router.get('/:id', moment_controller.find_one)
moment_router.patch('/:id', verify_auth, verify_permission('moment'), moment_controller.update)
moment_router.delete('/:id', verify_auth, verify_permission('moment'), moment_controller.delete)
moment_router.post(
  '/:id/labels',
  verify_auth,
  verify_permission('moment'),
  verify_label_exists,
  moment_controller.add_labels,
)
