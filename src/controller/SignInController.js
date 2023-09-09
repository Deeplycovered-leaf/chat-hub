import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, PUBLIC_KEY, UNAUTHORIZED } from '../config'

export default new class SignInController {
  sign_in(ctx) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: '1d',
      algorithm: 'RS256',
      allowInsecureKeySizes: true,
    })

    ctx.body = {
      code: 0,
      data: {
        token, id, name,
      },
    }
  }
}()
