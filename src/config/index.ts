import { ConnectionOptions } from '@odyssoft/tsorm'
import { config as env } from 'dotenv'

env()

const database: ConnectionOptions = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
}

const trueskill = {
  MU: 1250,
  SIGMA: 150,
  BETA: 400,
  TAU: 10,
}

export const config = {
  database,
  host: process.env.HOST,
  port: process.env.PORT,
  trueskill,
}
