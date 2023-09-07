import { app } from '../app'
import { NAME_OR_PASSWORD_IS_NULL, USER_EXIST } from '../config/error'

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
    default:
      break
  }

  ctx.body = {
    code,
    msg,
  }
})
