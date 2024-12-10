import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from './dto/file-upload-dto';
//File 받기위한 데코레이터
export function ApiFile() {
  return applyDecorators(
    UseInterceptors(FilesInterceptor('imageUrl')), // 기본적으로 dto의 이름이 설정됨
    ApiConsumes('multipart/form-data'), // Swagger 문서화
    ApiBody({ type: FilesUploadDto }), // Swagger 문서화
  );
}
