import process from 'node:process'
import dotenv from 'dotenv'

export * from './error'
export * from './screct'

dotenv.config()

export const { SERVER_PORT } = process.env
