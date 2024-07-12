import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  description: string;
}
