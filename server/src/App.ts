import * as Koa from "koa";
import * as HttpStatusCodes from "http-status-codes";

const app: Koa = new Koa();

// 错误处理中间件
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    ctx.status =
      err.statusCode || err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    err.status = ctx.status;
    ctx.body = { err };
    ctx.app.emit("error", err, ctx);
  }
});

// 路由
app.use(async (ctx: Koa.Context) => {
  ctx.body = "Hello World";
});

// 错误日志
app.on("error", console.error);

export default app;
