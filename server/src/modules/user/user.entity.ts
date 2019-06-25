import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column()
  password: string
}
