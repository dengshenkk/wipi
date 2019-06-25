import setupApp from './setupApp'
import withDatabaseConnection from './database'

const PORT: number = 3000

withDatabaseConnection()
  .then(() => {
    console.log('Connect to PostgreSQL successfully.')
    setupApp(PORT)
  })
  .catch(err => {
    console.error('Connect to PostgreSQL failed.')
    throw new Error(err)
  })
