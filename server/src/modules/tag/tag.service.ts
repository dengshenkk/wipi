import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import { TagEntity } from './tag.entity'

const getRepo = (): Repository<TagEntity> => {
  return getRepository(TagEntity)
}

export const getTags = async () => {
  const repo = getRepo()
  const ret = await repo.find()
  return ret
}

export const getTagsWithArticles = async (id: string) => {
  const repo = getRepo()
  const ret = await repo
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.articles', 'articles')
    .getMany()

  return ret
}

export const getTagById = async (id: string) => {
  const repo = getRepo()
  const ret = await repo.findOne(id)
  return ret
}

export const getTagByIdWithArticles = async (id: string) => {
  const repo = getRepo()
  const ret = await repo
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.articles', 'articles')
    .where('tag.id=:id')
    .setParameter('id', id)
    .getOne()
  return ret
}
