import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  // 첫 번째 매개변수 (연결할 엔티티 지정)
  // 두 번째 (현재 엔티티에서 연결된 객체를 어떻게 가져올 것인지 정의)
  // EX) board.comments는 Board 엔티티에서 comments배열을 사용함
  // JoinColumn은 postId 외래 키 컬럼을 사용하여 board.comments 엔티티와 연결
  @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  postId: Board;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
