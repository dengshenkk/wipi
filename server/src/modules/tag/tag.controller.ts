import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import * as HTTPStatusCodes from 'http-status-codes'
import { TagEntity } from './tag.entity'

import {
  getTags,
  getTagsWithArticles,
  getTagById,
  getTagByIdWithArticles,
} from './tag.service'

class TagController {
  get repo(): Repository<TagEntity> {
    return getRepository(TagEntity)
  }

  async getTags(ctx: Koa.Context) {
    const tags = await getTags()
    ctx.body = { data: tags }
  }

  async getTag(ctx: Koa.Context) {
    const id = ctx.params.id
    const tag = await getTagById(id)

    if (!tag) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    ctx.body = { data: tag }
  }

  async createTag(ctx: Koa.Context) {
    const tag = this.repo.create(ctx.request.body)
    await this.repo.save(tag)
    ctx.body = { data: tag }
  }

  async updateTag(ctx: Koa.Context) {
    const id = ctx.params.id
    const tag = await this.repo.findOne(id)

    if (!tag) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    const updatedTag = await this.repo.merge(tag, ctx.request.body)
    this.repo.save(updatedTag)
    ctx.body = { data: this.updateTag }
  }

  async deleteTag(ctx: Koa.Context) {
    const tag = await this.repo.findOne(ctx.params.id)

    if (!tag) {
      ctx.throw(HTTPStatusCodes.NOT_FOUND)
    }

    await this.repo.remove(tag) // 注意与 delete 的区别

    ctx.status = HTTPStatusCodes.NO_CONTENT
  }
}

export default new TagController()
