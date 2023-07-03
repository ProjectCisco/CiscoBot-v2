import { config } from 'dotenv'

config()

const database = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
}

export default {
  port: process.env.PORT,
  host: process.env.HOST,
}
