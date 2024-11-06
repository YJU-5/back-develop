import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class CreateBoardDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 타이틀',
    example: '제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '게시판 컨텐츠',
    example: '~내용',
  })
  @IsString()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;
}
