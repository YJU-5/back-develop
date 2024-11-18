import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({
    required: true,
    type: String,
    example: '제목 수정 내용',
  })
  @IsString()
  @IsNotEmpty()
  readonly title?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '수정 내용',
  })
  @IsString()
  readonly content?: string;

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
