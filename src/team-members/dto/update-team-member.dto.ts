import { CreateTeamMemberDto } from './create-team-member.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
  @ApiProperty({
    required: true,
    type: String,
    example: '팀 멤버 이름 수정 내용',
  })
  @IsString()
  @IsNotEmpty()
  readonly title?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '팀 멤버 콘텐츠 수정 내용',
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
