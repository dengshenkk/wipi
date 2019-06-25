import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export interface IToc {
  level: number
  anchor: string
  title: string
}

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

  @Column('text')
  html: string

  @Column('simple-array')
  toc: IToc[]

  @Column('simple-array')
  tags: string[]

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string
}
