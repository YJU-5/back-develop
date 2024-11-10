import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base/entities/base.entity'; // BaseEntity 경로에 맞게 import
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Board extends BaseEntity {
  @Column({ length: 25 })
  title: string;

  @Column()
  content: string;

  @Column('simple-array', { nullable: true })
  imageUrl: string[]; // 이미지 URL 배열로 변경

  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true })
  comments: Comment[];
}
