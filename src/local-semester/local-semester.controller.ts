import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { ApiFile } from '../decorator/api.file.decorator';
import { S3Service } from '../s3/s3.service';
import { LocalSemester } from './entities/local-semester.entity';

@Controller('local-semester')
export class LocalSemesterController {
  constructor(
    private readonly localSemesterService: LocalSemesterService,
    private readonly s3Service: S3Service,
  ) {}

  // 현지학기 생성
  @ApiOperationDecorator(
    '현지학기소개 Create',
    '# 현지학기소개 Create',
    200,
    '성공적으로 현지학기소개 Create',
  )
  @Post()
  @ApiFile('file')
  async create(
    @Body() createLocalSemesterDto: CreateLocalSemesterDto,
    @UploadedFiles() files: Express.Multer.File[],
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    let uploadedUrls: string[];
    if (file) {
      uploadedUrls = [await this.s3Service.uploadFile(file)];
    } else if (files && files.length > 0) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    } else {
      uploadedUrls = [];
    }
    return this.localSemesterService.create(
      createLocalSemesterDto,
      uploadedUrls,
    );
  }

  // 모든 현지학기 스케줄 가져오기
  @ApiOperationDecorator(
    '현지학기소개 Get All',
    '# 현지학기소개 Get All',
    200,
    '성공적으로 현지학기소개 Get All',
  )
  @Get()
  findAll(): Promise<LocalSemester[]> {
    return this.localSemesterService.findAll();
  }

  // 현지 학기 스케줄 가져오기 By Id
  @ApiOperationDecorator(
    '현지학기소개 Get by ID',
    '# 현지학기소개 Get by ID',
    200,
    '성공적으로 현지학기소개 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<LocalSemester> {
    return this.localSemesterService.findOne(id);
  }

  // 현지 학기 스케줄 update
  @ApiOperationDecorator(
    '현지학기소개 Update',
    '# 현지학기소개 Update',
    200,
    '성공적으로 현지학기소개 Update',
  )
  @Patch(':id')
  @ApiFile('file')
  async update(
    @Param('id') id: string,
    @Body() updateLocalSemesterDto: UpdateLocalSemesterDto,
    @UploadedFiles() files: Express.Multer.File[],
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    let uploadedUrls: string[];
    // 파일이 하나인경우
    if (file) {
      uploadedUrls = [await this.s3Service.uploadFile(file)];
      // 파일이 여러개인경우
    } else if (files && files.length > 0) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    } else {
      uploadedUrls = [];
    }
    console.log(uploadedUrls);
    // return this.boardService.update(id, updateBoardDto, uploadedUrls);
    return this.localSemesterService.update(
      id,
      updateLocalSemesterDto,
      uploadedUrls,
    );
  }

  @ApiOperationDecorator(
    '현지학기소개 Delete',
    '# 현지학기소개 Delete',
    200,
    '성공적으로 현지학기소개 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localSemesterService.remove(id);
  }
}
