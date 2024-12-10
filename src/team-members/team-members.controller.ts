import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ApiOperationDecorator } from '../decorator/api.operration.decorator';
import { S3Service } from '../s3/s3.service';
import { TeamMember } from './entities/team-member.entity';
import { ApiFileTeam } from '../decorator/api.file.team.decoraotr';

@Controller('team-members')
export class TeamMembersController {
  constructor(
    private readonly teamMembersService: TeamMembersService,
    private readonly s3Service: S3Service,
  ) {}

  // Get All 팀 멤버
  // Get All Swagger 팀 멤버 문서화
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

  // Get By Id 팀 멤버
  // Get By Id Swagger 팀 멤버 문서화
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

  // Create 팀 멤버
  // Create Swagger 문서화
  @ApiOperationDecorator(
    '조원소개 Create',
    '# 조원소개 Create',
    200,
    '성공적으로 조원소개 Create',
  )
  // team-members 생성 및 이미지 업로드
  @ApiFileTeam()
  @Post()
  async create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    let uploadedUrls: string[] = [];
    if (files) {
      uploadedUrls = await Promise.all(
        files.map((file) => this.s3Service.uploadFile(file)),
      );
    }
    return this.teamMembersService.create(createTeamMemberDto, uploadedUrls);
  }

  // Update 팀 멤버
  // Update 팀 멤버 Swagger 문서화
  @ApiOperationDecorator(
    '조원소개 Update',
    '# 조원소개 Update',
    200,
    '성공적으로 조원소개 Update',
  )
  @ApiFileTeam()
  @Patch(':id')
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
    return this.teamMembersService.update(
      id,
      updateTeamMemberDto,
      uploadedUrls,
    );
  }

  //Delete 팀 멤버
  //Delete Swagger 문서화
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
