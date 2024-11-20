import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadTeamDto } from './dto/file-upload-team-dot';
//api-file.decorator.ts
export function ApiFileTeam() {
  return applyDecorators(
    UseInterceptors(FilesInterceptor('files')),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: FilesUploadTeamDto }),
  );
};