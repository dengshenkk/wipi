import { IConfig } from './config.interface'

const config: IConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'postgres',
  },
  app: {
    port: 3000,
  },
  router: {
    prefix: '/',
  },
  token: {
    secret: 'plarum',
    expires: 1000 * 60 * 60 * 24 * 7,
    unless: [
      /^\/api\/v1\/user/,
      /^\/api\/v1\/article/,
      /^\/api\/v1\/classify/,
      /^\/api\/v1\/tag/,
    ],
  },
}
export default config
