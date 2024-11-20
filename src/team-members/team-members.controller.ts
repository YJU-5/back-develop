import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { S3Service } from '../s3/s3.service';
import { ApiFile } from '../decorator/api.file.decorator';
import { TeamMember } from './entities/team-member.entity';

@Controller('team-members')
export class TeamMembersController {
  constructor(
    private readonly teamMembersService: TeamMembersService,
    private readonly s3Service: S3Service,
  ) {}

  // team-members 생성
  @ApiOperationDecorator(
    '조원소개 Create',
    '# 조원소개 Create',
    200,
    '성공적으로 조원소개 Create',
  )

  // team-members 생성 및 이미지 업로드
  @Post()
  @ApiFile('file', {
    age: { type: 'number', example: 22 },
    major: { type: 'string', example: '컴퓨터공학' },
  })
  async create(
    @Body()
    createTeamMemberDto: CreateTeamMemberDto,
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
    return this.teamMembersService.create(createTeamMemberDto, uploadedUrls);
  }

  // 모든 team-members 가져오기
  @ApiOperationDecorator(
    '조원소개 Get All',
    '# 조원소개 Get All',
    200,
    '성공적으로 조원소개 Get All',
  )
  @Get()
  findAll(): Promise<TeamMember[]> {
    return this.teamMembersService.findAll();
  }

  // 팀 멤버 가져오기 By Id
  @ApiOperationDecorator(
    '조원소개 Get by ID',
    '# 조원소개 Get by ID',
    200,
    '성공적으로 조원소개 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamMember> {
    return this.teamMembersService.findOne(id);
  }

  // 팀 멤버 업데이트
  @ApiOperationDecorator(
    '조원소개 Update',
    '# 조원소개 Update',
    200,
    '성공적으로 조원소개 Update',
  )
  @Patch(':id')
  // @ApiFile('file', {
  //   age: { type: 'number', example: 22 },
  //   major: { type: 'string', example: '기존내용' },
  // })
  async update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    // return this.boardService.update(id, updateBoardDto, uploadedUrls);
    return this.teamMembersService.update(
      id,
      updateTeamMemberDto,
      uploadedUrls,
    );
  }

  @ApiOperationDecorator(
    '조원소개 Delete',
    '# 조원소개 Delete',
    200,
    '성공적으로 조원소개 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamMembersService.remove(id);
  }
}
