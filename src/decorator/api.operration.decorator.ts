import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiOperationDecorator(
  summary: string,
  description: string,
  status: number,
  responseDescription: string,
) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // 메서드를 소유한 객체의 정보(target), 메서드 이름(key), 메서드의 기능 정의(descriptor)
    ApiOperation({ summary, description })(target, key, descriptor);
    ApiResponse({ status, description: responseDescription })(
      target,
      key,
      descriptor,
    );
  };
}
