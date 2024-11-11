import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class CreateLocalSemesterDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '현지 타이틀',
    example: '오사카',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '현지 내용',
    example: '오사카에서 ~함',
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
