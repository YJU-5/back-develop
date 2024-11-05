import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class CreateBoardDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 타이틀',
    example: '제목',
  })
  @Column({ length: 25 })
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 컨텐츠',
    example: '~내용',
  })
  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true })
  comments: Comment[];
}
