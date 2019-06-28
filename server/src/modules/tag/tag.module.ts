import * as Router from 'koa-router'
import tagController from './tag.controller'

export function bootstrapTagModule(router: Router) {
  const prefix = '/tag'

  router.get(`${prefix}/`, tagController.getTags.bind(tagController))
  router.get(`${prefix}/:id`, tagController.getTag.bind(tagController))
  router.post(`${prefix}`, tagController.createTag.bind(tagController))
  router.patch(`${prefix}/:id`, tagController.updateTag.bind(tagController))
  router.delete(`${prefix}/:id`, tagController.deleteTag.bind(tagController))
}
