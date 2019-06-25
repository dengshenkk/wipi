import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import config from './config'

const connectionOps: ConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: ['./**/*.entity.ts'],
  synchronize: true,
}

export function connectPostgreSQL(): Promise<any> {
  return createConnection(connectionOps)
}
