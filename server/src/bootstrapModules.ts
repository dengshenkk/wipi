import * as Koa from 'koa'
import * as Router from 'koa-router'
import { bootstrapUserModule } from './modules/user/user.module'

export function bootstrapModules(app: Koa, router: Router) {
  void [bootstrapUserModule].forEach(bootstrapModule => {
    bootstrapModule(router)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
