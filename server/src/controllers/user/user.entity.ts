import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;
}
