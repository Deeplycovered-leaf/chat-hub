import { SERVER_HOST, SERVER_PORT } from '../../config'
import { user_service } from '../user'
import { file_service } from './file.service'

export const file_controller = new class FileController {
  async create(ctx) {
    const file = ctx.request.file
    const { id } = ctx.user

    await file_service.create({ id, ...file })

    const avatar_url = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`
    const res = await user_service.update_avatar({
      avatar_url,
      user_id: id,
    })

    ctx.body = {
      code: 0,
      data: res,
      message: '头像上传成功',
    }
  }

  async query(ctx) {
    const { offset, limit } = ctx.query

    const res = await file_service.query({ offset, limit })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态查询成功',
    }
  }

  async find_one(ctx) {
    const { id } = ctx.params

    const res = await file_service.query_by_id({ id })

    ctx.body = {
      code: 0,
      data: res[0],
      message: '动态详情查询成功',
    }
  }

  async update(ctx) {
    const { id } = ctx.params
    const { content } = ctx.request.body

    const res = await file_service.update({ id, content })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态详情修改成功',
    }
  }

  async delete(ctx) {
    const { id } = ctx.params

    const res = await file_service.delete({ id })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态删除成功',
    }
  }

  async add_labels(ctx) {
    const { id: moment_id } = ctx.params
    const { labels } = ctx

    let res
    for (const label of labels) {
      const { id: label_id } = await label

      const has_label = await file_service.has_label({ label_id, moment_id })
      if (!has_label)
        res = await file_service.add_labels({ label_id, moment_id })
    }

    ctx.body = {
      code: 0,
      data: res,
      message: '动态标签组添加成功',
    }
  }
}()
