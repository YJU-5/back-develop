import { ApiProperty } from '@nestjs/swagger';

export class FilesUploadTeamDto {
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

  @ApiProperty({
    description: '이 필드는 나이 데이터를 저장합니다.',
    type: Number,
    example: 22,
  })
  age: string;

  @ApiProperty({
    description: '이 필드는 문자열 데이터를 저장합니다.',
    type: String,
    example: '예시 문자열',
  })
  major: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
