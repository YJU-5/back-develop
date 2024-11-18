import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    // 부모 클래스인 PassportStrategy 호출하여 jwt인증에 필요한 설정 값 전달
    // 상속을 통해 부모의 기능을 활용할 때 사용한다
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰 추출
      ignoreExpiration: false, // 만료된 토큰 허용안함
      secretOrKey: 'NSMRSBYfb8',
    });
  }
//   async validate(payload: any) {
//     const user = this.usersService.findByUserId(payload.id);
//     if (!user) {
//       throw new UnauthorizedException('Invalid token or user not authorized');
//     }
//     return { userId: payload.id, email: payload.email };
//   }
}
