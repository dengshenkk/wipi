import * as Koa from 'koa'
import * as Router from 'koa-router'
import userController from './user.controller'

export default function withUserController(router: Router) {
  const prefix = '/user'

  router.get(`${prefix}/`, userController.getUsers.bind(userController))
  router.get(`${prefix}/:id`, userController.getUser.bind(userController))
  router.post(`${prefix}`, userController.createUser.bind(userController))
}
