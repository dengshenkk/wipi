import { connectPostgreSQL } from './connectPostgreSQL'
import { bootstrapApp } from './setupApp'

const PORT: number = 3000

connectPostgreSQL()
  .then(() => {
    console.log('Connect to PostgreSQL successfully.')
    bootstrapApp(PORT)
  })
  .catch(err => {
    console.error('Connect to PostgreSQL failed.')
    throw new Error(err)
  })
