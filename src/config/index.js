import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

export const { SERVER_PORT } = process.env
