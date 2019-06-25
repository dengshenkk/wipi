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
    prefix: '/api/v1',
  },
}
export default config
