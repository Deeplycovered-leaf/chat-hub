import { user_service } from '../service'

export default new class UserController {
  async create(ctx) {
    const user = ctx.request.body

    const res = await user_service.create(user)

    ctx.body = { code: 0, data: res }
  }

  async query(ctx) {
    try {
      const res = await user_service.select({
        query_content: '*',
        table_name: 'moment',
        expression: '',
        values: [],
      })

      ctx.body = { code: 0, data: res }
    }
    catch (error) {
      console.error('error =>', error)
    }
  }
}()
