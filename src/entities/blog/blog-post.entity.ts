import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs, { nullable: false })
  // @JoinColumn({ name: 'userId' })
  user: User;

  // @Column({ type: String })
  // userId: string;
}
