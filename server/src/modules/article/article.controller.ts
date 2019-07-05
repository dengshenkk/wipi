import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import * as HTTPStatusCodes from 'http-status-codes'
import * as moment from 'moment'
import { getTagById } from '../tag/tag.service'
import { ArticleEntity } from './article.entity'
import { marked } from './article.service'
import { isAdmin } from '../user/user.service'

class ArticleController {
  get repo(): Repository<ArticleEntity> {
    const repo: Repository<ArticleEntity> = getRepository(ArticleEntity)
    return repo
  }

  async getArticles(ctx: Koa.Context) {
    const articles = await this.repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.author', 'author')
      .getMany()
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
    let currentUser = ctx.request.body.currentUser
    const { html, toc } = marked(ctx.request.body.content)
    let tags = ctx.request.body.tags
    try {
      tags = tags.replace(/\[|\]/g, '').split(',')
    } catch (e) {}
    tags = await Promise.all(tags.map(getTagById))
    delete ctx.request.body.tags

    const article = this.repo.create({
      ...ctx.request.body,
      html,
      tags,
      toc: JSON.stringify(toc, null, 2),
      author: currentUser.id,
    })

    await this.repo.save(article)
    ctx.body = { data: article }
  }

  async updateArticle(ctx: Koa.Context) {
    const article = await this.repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('article.id=:id')
      .setParameter('id', ctx.params.id)
      .getOne()

    const author = article.author
    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && author.id !== currentUser.id) {
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    }

    if (!article) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    let tags = ctx.request.body.tags
    try {
      tags = tags.replace(/\[|\]/g, '').split(',')
    } catch (e) {}
    tags = await Promise.all(tags.map(getTagById))
    delete ctx.request.body.tags

    const updatedArticle = await this.repo.merge(article, {
      ...ctx.request.body,
      tags,
      updateAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.repo.save(updatedArticle)
    ctx.body = { data: updatedArticle }
  }

  async deleteArticle(ctx: Koa.Context) {
    const article = await this.repo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('article.id=:id')
      .setParameter('id', ctx.params.id)
      .getOne()

    if (!article) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    const currentUser = ctx.request.body.currentUser
    const can = await isAdmin(currentUser)

    if (!can && article.author.id !== currentUser.id) {
      ctx.throw(HTTPStatusCodes.FORBIDDEN)
    }

    await this.repo.remove(article) // 注意与 delete 的区别
    ctx.status = HTTPStatusCodes.NO_CONTENT
  }
}

export default new ArticleController()
