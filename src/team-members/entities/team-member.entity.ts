import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column('simple-array', { nullable: true })
  imageUrl: string[];
}
