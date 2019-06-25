import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

const connectionOps: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'plarum',
  password: 'plarum',
  database: 'plarum',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
}

export default function withDatabaseConnection(): Promise<any> {
  return createConnection(connectionOps)
}
