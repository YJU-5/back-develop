import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
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

  @ApiProperty({
    type: [String],
    description: '이미지 목록 (파일 형식)',
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
