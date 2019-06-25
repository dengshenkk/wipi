import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import * as HTTPStatusCodes from 'http-status-codes'
import { ArticleEntity } from './article.entity'
import { marked } from './article.service'

class ArticleController {
  get repo(): Repository<ArticleEntity> {
    const repo: Repository<ArticleEntity> = getRepository(ArticleEntity)
    return repo
  }

  async getArticles(ctx: Koa.Context) {
    const articles = await this.repo.find()
    ctx.body = { data: articles }
  }

  async getArticle(ctx: Koa.Context) {
    const id = ctx.params.id
    const article = await this.repo.findOne(id)

    if (!article) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    ctx.body = { data: article }
  }

  async createArticle(ctx: Koa.Context) {
    const { html, toc } = marked(ctx.request.body.content)
    const article = this.repo.create({
      ...ctx.request.body,
      html,
      toc: JSON.stringify(toc, null, 2),
    })
    await this.repo.save(article)
    ctx.body = { data: article }
  }

  async updateArticle(ctx: Koa.Context) {
    const article = await this.repo.findOne(ctx.param.id)

    if (!article) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    const updatedArticle = await this.repo.merge(article, ctx.request.body)
    this.repo.save(updatedArticle)
    ctx.body = { data: updatedArticle }
  }

  async deleteArticle(ctx: Koa.Context) {
    const article = await this.repo.findOne(ctx.params.id)

    if (!article) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    await this.repo.remove(article) // 注意与 delete 的区别

    ctx.status = HTTPStatusCodes.NO_CONTENT
  }
}

export default new ArticleController()
