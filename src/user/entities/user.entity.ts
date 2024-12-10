import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LocalSemester } from '../../local-semester/entities/local-semester.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // 자동 생성되는 기본 키
  id: string;

  @Column() // 테이블의 열을 나타냄 // user로그인 구현 필요
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => LocalSemester, (localSemester) => localSemester.user)
  localSemester: LocalSemester[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
