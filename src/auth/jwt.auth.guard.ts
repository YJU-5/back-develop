import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 요청이 들어올 때 이 메서드가 호출되어 인증처리
  canActivate(
    context: ExecutionContext, // 요청정보에 접근
    // 메서드 반환타입 지정, 성공시 true, 실패시 false
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
