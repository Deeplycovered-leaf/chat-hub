import { label_service } from '../service'

export async function verify_label_exists(ctx, next) {
  const { labels } = ctx.request.body

  ctx.labels = labels.map(async (name) => {
    const res = await label_service.query_by_name({ name })
    const label = { name }

    if (res.length) {
      Reflect.set(label, 'id', res[0].id)
    }
    else {
      const { id } = await label_service.create({ name })
      Reflect.set(label, 'id', id)
    }

    return label
  })

  await next()
}
