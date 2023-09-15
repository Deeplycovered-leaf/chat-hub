import { OPERATION_IS_NOT_ALLOWED } from '../config'
import { permission_service } from '../modules'

export function verify_permission(module_name) {
  return async (ctx, next) => {
    const { id } = ctx.user
    const { id: module_id } = ctx.params

    const has_permission = await permission_service.check({ module_name, module_id, user_id: id })

    if (!has_permission)
      return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)

    await next()
  }
}
