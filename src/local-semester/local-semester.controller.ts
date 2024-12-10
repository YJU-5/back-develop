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

  // Get All 현지학기
  // Get All Swagger 현지학기 문서화
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

  // Get By Id 현지학기
  // Get By Id Swagger 현지학기 문서화
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

  // Create 현지학기
  // Create Swagger 문서화
  @UseGuards(JwtAuthGuard)
  @ApiOperationDecorator(
    '현지학기소개 Create',
    '# 현지학기소개 Create',
    200,
    '성공적으로 현지학기소개 Create',
  )
  @ApiBearerAuth() // Swagger 토큰 인증 문서화
  // 안에 가드 클래스가 들어가면 엔드포인트에서 요청을 처리하기전에
  // canActivate 메서드를 실행하여 권한 확인을 수행하고 인증 완료되면 컨트롤러 메서드로 넘어감
  @ApiFile() // Swagger 파일 문서화
  @Post()
  async create(
    @Body() createLocalSemesterDto: CreateLocalSemesterDto,
    @UploadedFiles() files: Array<Express.Multer.File>, // Multer형식을 사용하는 이유는 파일 업로드를 처리하면서 제공하는 표준 인터페이스를 이용하기위해
    @Request() req, // 인증한 jwt정보
  ): Promise<any> {
    let uploadedUrls: string[] = []; // 파일Url을 한 개 업로드하든 여러개하든 배열에 담는다
    const user = req.user.userId; // 토큰에서 추출한 userId
    if (files) {
      // Promise.all 비동기 작업을 동시에 병렬로 처리
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)), // 파일Url이 배열로 이루어져있으므로 map을 사용하여 넣어줌
      );
    }
    return this.localSemesterService.create(
      createLocalSemesterDto,
      uploadedUrls,
      user,
    );
  }

  // Update 현지학기
  // Update 현지학기 Swagger 문서화
  @ApiOperationDecorator(
    '현지학기소개 Update',
    '# 현지학기소개 Update',
    200,
    '성공적으로 현지학기소개 Update',
  )
  @ApiFile()
  // patch : 리소스의 일부분만 업데이트한다 (path parameter요청)
  // put의 : 모든 리소스 업데이트
  @Patch(':id')
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

  //Delete 현지학기
  //Delete Swagger 문서화
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
