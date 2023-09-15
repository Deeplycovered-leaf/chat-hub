import { label_service } from './label.service'

export const label_controller = new class LabelController {
  async create(ctx) {
    const { name } = ctx.request.body

    const res = await label_service.create({ name })

    ctx.body = {
      code: 0,
      data: res,
      message: '标签创建成功',
    }
  }

  async query(ctx) {
    const { offset, limit } = ctx.query

    const res = await label_service.query({ offset, limit })

    ctx.body = {
      code: 0,
      data: res,
      message: '标签查询成功',
    }
  }

  async find_one(ctx) {
    const { id } = ctx.params

    const res = await label_service.query_by_id({ id })

    ctx.body = {
      code: 0,
      data: res[0],
      message: '标签查询成功',
    }
  }

  async update(ctx) {
    const { id } = ctx.params
    const { content } = ctx.request.body

    const res = await label_service.update({ id, content })

    ctx.body = {
      code: 0,
      data: res,
      message: '标签修改成功',
    }
  }

  async delete(ctx) {
    const { id } = ctx.params

    const res = await label_service.delete({ id })

    ctx.body = {
      code: 0,
      data: res,
      message: '标签删除成功',
    }
  }
}()
