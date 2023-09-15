import fs from 'node:fs'
import { PATH } from '../../config'
import { file_service } from '../file'
import { user_service } from './user.service'

export const user_controller = new class UserController {
  async create(ctx) {
    const user = ctx.request.body

    const res = await user_service.create(user)

    ctx.body = { code: 0, data: res }
  }

  async get_avatar(ctx) {
    const { id: user_id } = ctx.params

    const res = await file_service.query_avatar_by_user_id({ user_id })

    const { filename, mimetype } = res

    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${PATH.UPLOAD}/${filename}`)
  }

  async query(ctx) {
    try {
      const res = await user_service.select({

        query_content: '*',
        table_name: '"user"',
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
