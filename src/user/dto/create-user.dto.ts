import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CreateUserDto {
  @PrimaryGeneratedColumn('uuid') // 자동 생성되는 기본 키
  id: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '가입유저이름',
    example: '김씨',
  })
  @Column() // 테이블의 열을 나타냄 // user로그인 구현 필요
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '가입이메일',
    example: 'gudtjs1004s@naver.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '가입유저 패스워드',
    example: 'gudts219!',
  })
  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 수정일시
  updatedAt: Date;
}
