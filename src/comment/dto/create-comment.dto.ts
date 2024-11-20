import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '댓글',
    example: '댓글내용',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
