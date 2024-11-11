import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '로그인 이메일',
    example: 'gudtjs1004s@naver.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '로그인 패스워드',
    example: 'gudts219!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
