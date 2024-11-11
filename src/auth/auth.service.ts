import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  //사용자의 비밀번호 검사
  async validateUser(
    password: string,
    hashPassword: string,
    email: string,
    userId: string,
  ) {
    const isMatch = await bcrypt.compare(password, hashPassword);
    if (isMatch) {
      // 토큰 생성로직 불러오기
      const token = await this.createToken(email, userId);
      console.log(token);
      return token;
    } else {
      throw new UnauthorizedException('비밀번호가 유효하지 않습니다');
    }
  }
  // 토큰 생성 로직
  async createToken(email: string, userId: string) {// 토큰에 넣어줄 정보
    const payload = { email: email, userId: userId };
    return this.jwtService.sign(payload); // jwt 발급
  }
}
