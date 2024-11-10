// base.controller.ts
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';
import { ApiFile } from 'src/decorator/api.file.decorator';
import { Express } from 'express';
import { BaseEntity } from './entities/base.entity';

@Controller()
export class BaseController<T extends BaseEntity> {
  constructor(private readonly baseService: BaseService<T>) {}

  // 포스트 생성
  @ApiOperationDecorator(
    '게시판 Post',
    '# 게시판 Post',
    201,
    '성공적으로 게시판 Post',
  )
  @Post()
  async create(
    @Body() createDto: any, // 이 부분은 자식 컨트롤러에서 DTO에 맞춰 정의됩니다.
    @UploadedFiles() files: Express.Multer.File[],
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    let uploadedUrls: string[] = [];

    if (file) {
      uploadedUrls = [await this.baseService.uploadFile(file)];
    } else if (files && files.length > 0) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.baseService.uploadFile(file)),
      );
    }

    return this.baseService.create(createDto, uploadedUrls);
  }

  // 모든 게시판 가져오기
  @ApiOperationDecorator(
    '게시판 Get',
    '# 게시판 Get',
    200,
    '성공적으로 게시판 Get',
  )
  @Get()
  findAll(): Promise<any[]> {
    return this.baseService.findAll();
  }

  // 게시판 ID로 가져오기
  @ApiOperationDecorator(
    '게시판 Get by ID',
    '# 게시판 Get by ID',
    200,
    '성공적으로 게시판 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.baseService.findOne(id);
  }

  // 게시판 업데이트
  @ApiOperationDecorator(
    '게시판 Update',
    '# 게시판 Update',
    200,
    '성공적으로 게시판 Update',
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: any,// 자식 DTO에 맞게 설정
  ): Promise<any> {
    return this.baseService.update(id, updateDto);
  }

  // 게시판 삭제
  @ApiOperationDecorator(
    '게시판 Delete',
    '# 게시판 Delete',
    200,
    '성공적으로 게시판 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.baseService.remove(id);
  }
}
