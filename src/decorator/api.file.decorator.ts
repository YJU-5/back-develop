import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from './dto/file-upload-dto';
//api-file.decorator.ts
export function ApiFile() {
  return applyDecorators(
    UseInterceptors(FilesInterceptor('files')),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: FilesUploadDto }),
  );
}