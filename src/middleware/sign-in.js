import jwt from 'jsonwebtoken'
import { NAME_OR_PASSWORD_IS_NULL, PASSWORD_IS_INCORRECT, PUBLIC_KEY, UNAUTHORIZED, USER_IS_NOT_EXIST } from '../config'
import { user_service } from '../service'
import { md5 } from '../utils'

export async function verify_sign(ctx, next) {
  const { name, password } = ctx.request.body

  if (!name || !password)
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_NULL, ctx)

  const users = await user_service.find(name)
  const user = users[0]
  if (!users.length)
    return ctx.app.emit('error', USER_IS_NOT_EXIST, ctx)

  if (user.password !== md5(password))
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)

  ctx.user = user

  await next()
}

export async function verify_auth(ctx, next) {
  const authorization = ctx.headers.authorization
  if (!authorization)
    return ctx.app.emit('error', UNAUTHORIZED, ctx)

  const token = authorization.replace('Bearer ', '')

  try {
    const res = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })

    ctx.user = res

    await next()
  }
  catch (error) {
    console.error(error)
    return ctx.app.emit('error', UNAUTHORIZED, ctx)
  }
}
