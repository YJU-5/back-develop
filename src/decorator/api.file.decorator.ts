import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
//api-file.decorator.ts
export function ApiFile(
  fieldName: string = 'file',
  extraFields?: Record<string, any>, // 추가필드 받는 매개변수
) {
  const properties: Record<string, any> = {
    title: { type: 'string', example: '제목' },
    content: { type: 'string', example: '콘텐츠내용' },
    [fieldName]: {
      // 👈 this property
      type: 'string',
      format: 'binary',
    },
  };

  // 추가 필드 병합
  if (extraFields) {
    Object.assign(properties, extraFields);
  }

  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor(fieldName)),
    ApiBody({
      schema: {
        type: 'object',
        properties,
      },
    }),
  );
}
