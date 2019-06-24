import * as Koa from "koa";
import * as Router from "koa-router";
import withUserController from "./user/user.route";

export default function withControllers(app: Koa, router: Router) {
  [withUserController].forEach(withController => {
    withController(router);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}
