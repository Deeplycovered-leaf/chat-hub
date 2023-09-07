import { user_service } from '../service'
import { md5 } from '../utils'

export async function verify_user(ctx, next) {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    ctx.app.emit('error', 'name_or_password_is_null', ctx)
    return
  }

  const has_user = await user_service.find(name)
  if (has_user) {
    ctx.app.emit('error', 'user_exist', ctx)
    return
  }

  await next()
}

export async function hash_password(ctx, next) {
  const { password } = ctx.request.body

  ctx.request.body.password = md5(password)

  await next()
}
