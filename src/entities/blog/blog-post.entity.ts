import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
