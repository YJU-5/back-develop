import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class CreateTeamMemberDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '팀 멤버 이름',
    example: '팀 멤버 이름',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '팀 멤버 내용',
    example: '좌우명 : 잘 살자',
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
