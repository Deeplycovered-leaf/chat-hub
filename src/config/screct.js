import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'))
export const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'))
