import * as Koa from "koa";
import * as Router from "koa-router";
import withControllers from "./controllers";
import withMiddlewares from "./middlewares";

export default function setupApp(port: number) {
  const app: Koa = new Koa();
  const router: Router = new Router();

  withMiddlewares(app);
  withControllers(app, router);

  // 错误日志
  app.on("error", console.error);

  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
}
