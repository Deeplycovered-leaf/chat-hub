import { user_service } from '../service'

export default new class UserController {
  async create(ctx) {
    const user = ctx.request.body

    const res = await user_service.create(user)

    ctx.body = { code: 0, data: res }
  }
}()
