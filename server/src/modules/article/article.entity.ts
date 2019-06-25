import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  summary: string

  @Column('text')
  content: string

  @Column('simple-array')
  tags: string[]

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: string
}
