import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserRole } from 'src/types/enum/enum.type';
import { BlogPost } from '../blog/blog-post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @Column({ name: 'FullName' })
  name: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => BlogPost, (blog) => blog.user)
  blogs: BlogPost[];
}
