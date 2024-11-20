import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  title: string;

  @Column()
  age: number;

  @Column()
  major: string;

  @Column('text')
  content: string;

  @Column('simple-array', { nullable: true })
  imageUrl: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
