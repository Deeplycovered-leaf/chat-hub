import { app } from '../app'
import { NAME_OR_PASSWORD_IS_NULL, OPERATION_IS_NOT_ALLOWED, PASSWORD_IS_INCORRECT, UNAUTHORIZED, USER_EXIST, USER_IS_NOT_EXIST } from '../config'

app.on('error', (err, ctx) => {
  let code = 0
  let msg = ''

  switch (err) {
    case NAME_OR_PASSWORD_IS_NULL:
      code = -1001
      msg = '用户名或密码不能为空'
      break
    case USER_EXIST:
      code = -1002
      msg = '用户已存在!!!'
      break
    case USER_IS_NOT_EXIST:
      code = -1003
      msg = '用户不存在!!!'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      msg = '密码错误!!!'
      break
    case UNAUTHORIZED:
      code = -1005
      msg = '无效token,未授权!!!'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      msg = '操作不允许!!!'
      break

    default:
      break
  }

  ctx.body = {
    code,
    msg,
  }
})
