import * as Router from 'koa-router'
import articleController from './article.controller'

export function bootstrapArticleModule(router: Router) {
  const prefix = '/article'

  router.get(
    `${prefix}/`,
    articleController.getArticles.bind(articleController),
  )
  router.get(
    `${prefix}/:id`,
    articleController.getArticle.bind(articleController),
  )
  router.post(
    `${prefix}`,
    articleController.createArticle.bind(articleController),
  )
  router.patch(
    `${prefix}:id`,
    articleController.updateArticle.bind(articleController),
  )
  router.delete(
    `${prefix}/:id`,
    articleController.deleteArticle.bind(articleController),
  )
}
