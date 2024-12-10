import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { CreateLocalSemesterDto } from './dto/create-local-semester.dto';
import { UpdateLocalSemesterDto } from './dto/update-local-semester.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { ApiFile } from '../decorator/api.file.decorator';
import { S3Service } from '../s3/s3.service';
import { LocalSemester } from './entities/local-semester.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
@Controller('local-semester')
export class LocalSemesterController {
  constructor(
    private readonly localSemesterService: LocalSemesterService,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  // 현지학기 생성
  @ApiOperationDecorator(
    '현지학기소개 Create',
    '# 현지학기소개 Create',
    200,
    '성공적으로 현지학기소개 Create',
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiFile()
  async create(
    @Body() createLocalSemesterDto: CreateLocalSemesterDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req, // 인증한 jwt정보
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    const user = req.user.userId;
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    return this.localSemesterService.create(
      createLocalSemesterDto,
      uploadedUrls,
      user,
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
  @ApiFile()
  async update(
    @Param('id') id: string,
    @Body() updateLocalSemesterDto: UpdateLocalSemesterDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    // 기존 AWS URL은 Body에서 받아온다
    // 파일이 있는 경우
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
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
