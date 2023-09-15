import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export * from './user'
export * from './moment'
export * from './comment'
export * from './label'
export * from './permission'
export * from './sign-in'
export * from './file'

export async function register_routes(app) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const dirs = fs.readdirSync(__dirname)

  for (const dir of dirs) {
    if (dir === 'index.js')
      continue

    const files = fs.readdirSync(`${__dirname}\\${dir}`)

    for (const file of files) {
      if (!file.endsWith('.router.js'))
        continue

      const module = await import(`./${dir}/${file}`)
      const router_key = Object.keys(module)[0]
      const router = module[router_key]

      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }
}
