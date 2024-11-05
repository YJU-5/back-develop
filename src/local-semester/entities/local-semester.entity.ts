import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocalSemester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;
}
