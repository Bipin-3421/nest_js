import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  description: string;
}
