import { comment_service } from './comment.service'

export const comment_controller = new class CommentController {
  async create(ctx) {
    const { content, moment_id } = ctx.request.body
    const { id } = ctx.user

    const res = await comment_service.create({ id, content, moment_id })

    ctx.body = {
      code: 0,
      data: res,
      message: '评论创建成功',
    }
  }

  async reply(ctx) {
    const { content, moment_id, comment_id } = ctx.request.body
    const { id } = ctx.user

    const res = await comment_service.reply({ id, content, moment_id, comment_id })

    ctx.body = {
      code: 0,
      data: res,
      message: '评论回复成功',
    }
  }

  async query(ctx) {
    const { offset, limit } = ctx.query

    const res = await comment_service.query({ offset, limit })

    ctx.body = {
      code: 0,
      data: res,
      message: '动态查询成功',
    }
  }

  async find_one(ctx) {
    const { id } = ctx.params

    const res = await comment_service.query_by_id({ id })

    ctx.body = {
      code: 0,
      data: res[0],
      message: '动态详情查询成功',
    }
  }

  async update(ctx) {
    const { id } = ctx.params
    const { content } = ctx.request.body

    const res = await comment_service.update({ id, content })

    ctx.body = {
      code: 0,
      data: res,
      message: '评论修改成功',
    }
  }

  async delete(ctx) {
    const { id } = ctx.params

    const res = await comment_service.delete({ id })

    ctx.body = {
      code: 0,
      data: res,
      message: '评论删除成功',
    }
  }
}()
