import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'

export default new class SignInController {
  sign_in(ctx) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, { expiresIn: '1d', algorithm: 'RSh256' })
    ctx.body = {
      code: 0,
      data: {
        token, id, name,
      },
    }
  }
}()
