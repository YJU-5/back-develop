import { ApiParam } from '@nestjs/swagger';

export function ApiParamDecorator() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // 메서드를 소유한 객체의 정보(target), 메서드 이름(key), 메서드의 기능 정의(descriptor)
    ApiParam({
      name: 'id', // 경로 매개변수 이름
      description: '게시물 ID', // 설명
      required: true, // 필수 여부
      type: String, // 매개변수 타입
    })(target, key, descriptor); // 호출하고 결과를 적용
  };
}
