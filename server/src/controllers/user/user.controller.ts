import * as Koa from "koa";
import { getRepository, Repository } from "typeorm";
import * as HTTPStatusCodes from "http-status-codes";
import UserEntity from "./user.entity";

class UserController {
  get repo(): Repository<UserEntity> {
    const repo: Repository<UserEntity> = getRepository(UserEntity);
    return repo;
  }

  /**
   * 获取所有用户
   * @param ctx
   */
  async getUsers(ctx: Koa.Context) {
    const users = await this.repo.find();
    ctx.body = { data: users };
  }

  /**
   * 获取指定用户
   * @param ctx
   */
  async getUser(ctx: Koa.Context) {
    const id = ctx.params.id;
    const user = await this.repo.findOne(id);

    if (!user) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND);
    }

    ctx.body = { data: user };
  }

  /**
   * 创建用户
   * @param ctx
   */
  async createUser(ctx: Koa.Context) {
    const user = this.repo.create(ctx.request.body);
    await this.repo.save(user);
    ctx.body = { data: user };
  }
}

export default new UserController();
