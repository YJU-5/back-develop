import { ApiProperty } from '@nestjs/swagger';

export class FilesUploadDto {
  @ApiProperty({
    description: '이 필드는 문자열 데이터를 저장합니다.',
    type: String,
    example: '예시 문자열',
  })
  title: string;

  @ApiProperty({
    description: '이 필드는 문자열 데이터를 저장합니다.',
    type: String,
    example: '예시 문자열',
  })
  content: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
