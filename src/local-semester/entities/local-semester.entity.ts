import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocalSemester {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column('simple-array', { nullable: true })
  imageUrl: string[]; // 이미지 URL 배열로 변경

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
