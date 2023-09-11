import { moment_service } from '../service'

export default new class MomentController {
  async create(ctx) {
    const { content } = ctx.request.body
    const { id } = ctx.user

    const res = await moment_service.create({ id, content })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态创建成功',
    }
  }

  async query(ctx) {
    const { offset, limit } = ctx.query

    const res = await moment_service.query({ offset, limit })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态查询成功',
    }
  }

  async find_one(ctx) {
    const { id } = ctx.params

    const res = await moment_service.query_by_id({ id })

    ctx.body = {
      code: 0,
      data: res[0],
      message: '动态详情查询成功',
    }
  }

  async update(ctx) {
    const { id } = ctx.params
    const { content } = ctx.request.body

    const res = await moment_service.update({ id, content })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态详情修改成功',
    }
  }

  async delete(ctx) {
    const { id } = ctx.params

    const res = await moment_service.delete({ id })

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

      const has_label = await moment_service.has_label({ label_id, moment_id })
      if (!has_label)
        res = await moment_service.add_labels({ label_id, moment_id })
    }

    ctx.body = {
      code: 0,
      data: res,
      message: '动态标签组添加成功',
    }
  }
}()
