import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 요청이 들어올 때 이 메서드가 호출되어 인증처리
  canActivate(
    context: ExecutionContext, // 요청정보에 접근
    // 메서드 반환타입 지정, 성공시 true를 하여 요청 처리, 실패시 false를 하여 요청차단
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // switchToHttp(HTTP 정보로 전환 후) getRequest(HTTP 요청 객체 반환)
    const token = request.headers.authorization?.split(' ')[1]; // 헤드에서 토큰 추출
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    return super.canActivate(context); // JWT 실제로 검증하는 역할
  }
}
