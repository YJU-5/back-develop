import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadTeamDto } from './dto/file-upload-team-dot';
// 다른 게시판과 엔티티가 살짝 다르기 때문에 따로 작성함
export function ApiFileTeam() {
  return applyDecorators(
    UseInterceptors(FilesInterceptor('imageUrl')),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: FilesUploadTeamDto }),
  );
}
