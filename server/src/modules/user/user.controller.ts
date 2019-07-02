import * as Koa from 'koa'
import * as HTTPStatusCodes from 'http-status-codes'
import { UserEntity } from './user.entity'
import {
  isAdmin,
  getUser,
  getUsers,
  getUserById,
  createUser,
  createToken,
  updateUser,
  deleteUserById,
} from './user.service'
import { IUser, Roles } from './user.interface'

class UserController {
  async login(ctx: Koa.Context) {
    let { name, password } = ctx.request.body
    const user = await getUser({
      name,
      password,
    })

    if (!user) {
      ctx.throw(HTTPStatusCodes.BAD_REQUEST)
    }
    const token = await createToken(user)
    delete user.password
    ctx.body = { data: user, token }
  }

  async register(ctx: Koa.Context) {
    let { name, password, role, currentUser } = ctx.request.body

    if (currentUser) {
      const can = await isAdmin(currentUser)

      if (!can) {
        // 非管理员分配权限
        ctx.throw(HTTPStatusCodes.FORBIDDEN)
      }
    } else {
      role = null
    }

    try {
      const user = await createUser({
        name,
        password,
        role: role || Roles.normal,
      })
      ctx.body = { data: user }
    } catch (e) {
      if (e.code == '23505') {
        ctx.throw(HTTPStatusCodes.BAD_REQUEST, `${name} already exists`)
      }
    }
  }

  async getUser(ctx: Koa.Context) {
    const { id } = ctx.params
    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && id !== currentUser.id) {
      // 非管理员查看他人用户信息
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    } else {
      const user = await getUserById(id)

      if (!user) {
        ctx.throw(HTTPStatusCodes.NOT_FOUND)
      }

      ctx.body = { data: user }
    }
  }

  async getUsers(ctx: Koa.Context) {
    console.log(ctx.request.body.currentUser)
    const can = await isAdmin(ctx.request.body.currentUser)
    if (can) {
      const users = await getUsers()
      ctx.body = { data: users }
    } else {
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    }
  }

  async updateUser(ctx: Koa.Context) {
    const id = ctx.param.id
    const newInfo = ctx.request.body
    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && id !== currentUser.id) {
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    } else {
      newInfo.id = id
      await updateUser(newInfo)
      ctx.status = HTTPStatusCodes.NO_CONTENT
    }
  }

  async deleteUser(ctx: Koa.Context) {
    const id = ctx.param.id
    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && id !== currentUser.id) {
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    } else {
      await deleteUserById(id)
      ctx.status = HTTPStatusCodes.NO_CONTENT
    }
  }
}

export default new UserController()
