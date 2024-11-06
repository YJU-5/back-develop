import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateUserDto {

  @ApiProperty({
    required: true,
    type: String,
    description: '가입유저이름',
    example: '김씨',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '가입이메일',
    example: 'gudtjs1004s@naver.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '가입유저 패스워드',
    example: 'gudts219!',
  })
  @IsString()
  password: string;
}
