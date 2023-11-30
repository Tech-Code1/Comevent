import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

@Entity({ name: 'specialty' })
export class Specialty {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name!: string;

  @OneToMany(() => User, (user) => user.specialty)
  users!: User[];
}
