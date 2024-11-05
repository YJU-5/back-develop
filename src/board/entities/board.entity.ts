import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true })
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
