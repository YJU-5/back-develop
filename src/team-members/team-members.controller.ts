import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ApiOperationDecorator } from 'src/decorator/api.operration.decorator';

@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @ApiOperationDecorator(
    '조원소개 Create',
    '# 조원소개 Create',
    200,
    '성공적으로 조원소개 Create',
  )
  @Post()
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMembersService.create(createTeamMemberDto);
  }

  @ApiOperationDecorator(
    '조원소개 Get',
    '# 조원소개 Get',
    200,
    '성공적으로 조원소개 Get',
  )
  @Get()
  findAll() {
    return this.teamMembersService.findAll();
  }

  @ApiOperationDecorator(
    '조원소개 Get by ID',
    '# 조원소개 Get by ID',
    200,
    '성공적으로 조원소개 Get by ID',
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMembersService.findOne(+id);
  }

  @ApiOperationDecorator(
    '조원소개 Update',
    '# 조원소개 Update',
    200,
    '성공적으로 조원소개 Update',
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teamMembersService.update(+id, updateTeamMemberDto);
  }

  @ApiOperationDecorator(
    '조원소개 Delete',
    '# 조원소개 Delete',
    200,
    '성공적으로 조원소개 Delete',
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMembersService.remove(+id);
  }
}
