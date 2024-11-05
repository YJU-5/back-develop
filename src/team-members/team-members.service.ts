import { Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamRepository: Repository<TeamMember>,
  ) {}

  
  create(createTeamMemberDto: CreateTeamMemberDto) {
    return 'This action adds a new teamMember';
  }

  findAll() {
    return `This action returns all teamMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMember`;
  }

  update(id: number, updateTeamMemberDto: UpdateTeamMemberDto) {
    return `This action updates a #${id} teamMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMember`;
  }
}
