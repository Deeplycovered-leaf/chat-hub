import { user_service } from '../modules'
import { md5 } from '../utils'
import { NAME_OR_PASSWORD_IS_NULL, USER_EXIST } from '../config'

export async function verify_user(ctx, next) {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_NULL, ctx)
    return
  }

  const users = await user_service.find(name)
  if (users.length) {
    ctx.app.emit('error', USER_EXIST, ctx)
    return
  }

  await next()
}

export async function hash_password(ctx, next) {
  const { password } = ctx.request.body

  ctx.request.body.password = md5(password)

  await next()
}
