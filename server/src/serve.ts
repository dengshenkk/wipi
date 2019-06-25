import { connectPostgreSQL } from './connectPostgreSQL'
import { bootstrapApp } from './bootstrapApp'
import config from './config'

const PORT: number = config.app.port

connectPostgreSQL()
  .then(() => {
    console.log('Connect to PostgreSQL successfully.')
    bootstrapApp(PORT)
  })
  .catch(err => {
    console.error('Connect to PostgreSQL failed.')
    throw new Error(err)
  })
