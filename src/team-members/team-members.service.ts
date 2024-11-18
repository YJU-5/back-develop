/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamRepository: Repository<TeamMember>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createTeamMemberDto: CreateTeamMemberDto,
    uploadedUrl: string[],
  ): Promise<TeamMember> {
    const newTeamMember = this.teamRepository.create({
      title: createTeamMemberDto.title,
      content: createTeamMemberDto.content,
      imageUrl: uploadedUrl,
    });
    const saveTeamMember = await this.teamRepository.save(newTeamMember);
    return saveTeamMember;
  }

  async findAll(): Promise<TeamMember[]> {
    const TeamMembersAllList = await this.teamRepository.find();
    return TeamMembersAllList;
  }

  // ID로 팀 멤버 불러오기
  async findOne(id: string): Promise<TeamMember> {
    const TeamMemberByIdList = await this.teamRepository.findOne({
      where: { id },
    });
    return TeamMemberByIdList;
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto, uploadedUrl:string[],): Promise<TeamMember> {
    const TeamMember = await this.teamRepository.findOneBy({id})
    await this.s3Service.deleteFile(TeamMember.imageUrl)
    await this.teamRepository.update(id,{
      title: updateTeamMemberDto.title,
      content:updateTeamMemberDto.content,
      imageUrl:uploadedUrl,
    });
    return TeamMember;
  }

  // 삭제 
  async remove(id: string): Promise<void> {
    const TeamMember = await this.teamRepository.findOneBy({id})
    await this.s3Service.deleteFile(TeamMember.imageUrl);
    await this.teamRepository.delete({ id });
  }
}
