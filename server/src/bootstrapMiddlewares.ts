import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import { bootstrapErrorHandlerMiddleware } from './middlewares/error'

export function bootstrapMiddlewares(app: Koa) {
  void [bodyparser, bootstrapErrorHandlerMiddleware].forEach(
    bootstrapMiddleware => {
      bootstrapMiddleware(app)
    },
  )
}
