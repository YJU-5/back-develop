import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { IsString } from 'class-validator';

@Entity()
export class CreateBoardDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 타이틀',
    example: '제목',
  })
  @Column({ length: 25 })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 컨텐츠',
    example: '~내용',
  })
  @Column()
  @IsString()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Comment, (comment) => comment.postId, { cascade: true })
  comments: Comment[];
}
