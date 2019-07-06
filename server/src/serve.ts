import { connectPostgreSQL } from './connectPostgreSQL'
import { bootstrapApp } from './bootstrapApp'
import config from './config'
import { createUser } from './modules/user/user.service'

const PORT: number = config.app.port

connectPostgreSQL()
  .then(async () => {
    console.log('Connect to PostgreSQL successfully.')
    bootstrapApp(PORT)

    if (config.defaultUser) {
      try {
        await createUser(config.defaultUser)
        console.log(
          '服务已启动，并创建用户[name= %s, password= %s]',
          config.defaultUser.name,
          config.defaultUser.password,
        )
      } catch (e) {
        console.log('服务已启动，但创建默认用户失败！')
      }
    }
  })
  .catch(err => {
    console.error('Connect to PostgreSQL failed.')
    throw new Error(err)
  })
