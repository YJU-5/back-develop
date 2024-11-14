import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
//api-file.decorator.ts
export function ApiFile(fieldName: string = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor(fieldName)),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          [fieldName]: {
            // 👈 this property
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
