import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { TagEntity } from '../tag/tag.entity'
import { ITag } from '../tag/tag.interface'
import { IToc } from './article.interface'

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  summary: string

  @Column('text')
  content: string

  @Column()
  cover: string

  @Column('text')
  html: string

  @Column('simple-array')
  toc: IToc[]

  @ManyToMany(type => TagEntity, (tag: ITag) => tag.articles, { cascade: true })
  @JoinTable()
  tags: ITag[]

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string

  @Column({ type: 'timestamp' })
  publishAt: string

  @Column('int')
  views: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string
}
