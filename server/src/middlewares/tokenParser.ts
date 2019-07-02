import * as Koa from 'koa'
import * as jwtParser from 'jwt-simple'
import * as HttpStatusCodes from 'http-status-codes'
import config from '../config'

export const useTokenParser = () => {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const token = ctx.request.header.authorization

    console.log('token', 1, token, ctx.request.headers.authorization)

    if (token) {
      let payload = jwtParser.decode(token.split(' ')[1], config.token.secret)
      ctx.request.body = ctx.request.body || {}
      ctx.request.body.currentUser = payload

      console.log('token', 2, payload)
    }
    // } else {
    //   ctx.throw(
    //     HttpStatusCodes.BAD_REQUEST,
    //     'Please set TOKEN in request header',
    //   )
    // }

    await next()
  }
}
