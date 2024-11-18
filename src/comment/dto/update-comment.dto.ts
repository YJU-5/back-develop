import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    required: true,
    type: String,
    description: '댓글',
    example: '댓글내용',
  })
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line prettier/prettier
      content: string;
}
