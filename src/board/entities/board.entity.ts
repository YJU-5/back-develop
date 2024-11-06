import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  // 첫 번째 매개변수 (연결할 엔티티 지정)
  // 두 번째 연결된 댓글을 어떻게 가져올 것인지 정의
  // EX) comment.postId는 Comment 엔티티에서 postId가 Board 엔티티와 연결되므로 이걸 가져옴
  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true }) // 엔티티 연결 변동사항 자동 전파
  comments: Comment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
