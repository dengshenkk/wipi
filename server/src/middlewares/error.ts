import * as Koa from 'koa'
import * as HttpStatusCodes from 'http-status-codes'

export function bootstrapErrorHandlerMiddleware(app: Koa) {
  app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (err) {
      ctx.status =
        err.statusCode || err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR
      err.status = ctx.status
      ctx.body = { err }
      ctx.app.emit('error', err, ctx)
    }
  })
}
