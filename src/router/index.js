import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export * from './user.router'
export * from './sign-in.router'

export async function register_routes(app) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const files = fs.readdirSync(__dirname)

  for (const file of files) {
    if (!file.endsWith('.router.js'))
      continue

    const module = await import(`./${file}`)
    const router_key = Object.keys(module)[0]
    const router = module[router_key]

    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
