import { CreateLocalSemesterDto } from './create-local-semester.dto';
import { Column } from 'typeorm';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateLocalSemesterDto extends PartialType(
  CreateLocalSemesterDto,
) {
  @ApiProperty({
    required: true,
    type: String,
    example: '현지 학기 제목 수정 내용',
  })
  @IsString()
  readonly title?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '현지 학기 콘텐츠 수정 내용',
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
