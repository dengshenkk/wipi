import * as Koa from 'koa'
import * as Router from 'koa-router'
import { bootstrapModules } from './bootstrapModules'
import { bootstrapMiddlewares } from './bootstrapMiddlewares'

export function bootstrapApp(port: number) {
  const app: Koa = new Koa()

  const router: Router = new Router()

  bootstrapMiddlewares(app)
  bootstrapModules(app, router)

  // 错误日志
  app.on('error', console.error)

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}
