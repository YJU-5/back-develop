import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateCommentDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '댓글',
    example: '댓글내용',
  })
  @IsString()
  content: string;
}
