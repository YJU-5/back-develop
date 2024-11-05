import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({
    required: true,
    type: String,
    example: '제목 수정 내용',
  })
  @IsString()
  readonly title?: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '수정 내용',
  })
  @IsString()
  readonly content?: string;
}
