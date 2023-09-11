import process from 'node:process'
import dotenv from 'dotenv'

export * from './error'
export * from './screct'
export * from './path'

dotenv.config()

export const { SERVER_PORT, SERVER_HOST } = process.env
