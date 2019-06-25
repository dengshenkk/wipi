import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import withErrorHandlerMiddleware from './error'

export default function withMiddlewares(app: Koa) {
  void [bodyparser, withErrorHandlerMiddleware].forEach(withMiddleware => {
    withMiddleware(app)
  })
}
