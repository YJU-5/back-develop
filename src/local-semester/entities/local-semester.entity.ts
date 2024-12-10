import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class LocalSemester {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  title: string;

  @Column('text')
  content: string;

  @Column('simple-array', { nullable: true })
  imageUrl: string[]; // 이미지 URL 배열로 변경

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // user의 localSemester에 localSemester의 아이디들이 들어감(배열로 복수가)
  // localSemester의 user에 작성한 유저의 아이디가 들어감 (단수가)
  @ManyToOne(() => User, (user) => user.localSemester)
  user: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
