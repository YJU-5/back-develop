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

  // Get All 팀 멤버
  async findAll(): Promise<TeamMember[]> {
    const TeamMembersAllList = await this.teamRepository.find();
    return TeamMembersAllList;
  }

  // ID로 상세가져오기
  async findOne(id: string): Promise<TeamMember> {
    const TeamMemberByIdList = await this.teamRepository.findOne({
      where: { id },
    });
    return TeamMemberByIdList;
  }

  // Create 팀 멤버
  async create(
    createTeamMemberDto: CreateTeamMemberDto,
    uploadedUrl: string[],
  ): Promise<TeamMember> {
    // 저장해줄 객체 생성
    const newTeamMember = this.teamRepository.create({
      title: createTeamMemberDto.title,
      content: createTeamMemberDto.content,
      age : createTeamMemberDto.age,
      major: createTeamMemberDto.major,
      imageUrl: uploadedUrl,
    });
    // 실제 저장
    const saveTeamMember = await this.teamRepository.save(newTeamMember);
    return saveTeamMember;
  }

  // Update 팀 멤버
  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto, uploadedUrl:string[],): Promise<TeamMember> {
    const TeamMember = await this.teamRepository.findOneBy({id})
    await this.s3Service.deleteFile(TeamMember.imageUrl)
    await this.teamRepository.update(id,{
      title: updateTeamMemberDto.title,
      content:updateTeamMemberDto.content,
      age:updateTeamMemberDto.age,
      major:updateTeamMemberDto.major,
      imageUrl:uploadedUrl,
    });
    const UpdatedTeamMember = await this.teamRepository.findOneBy({id})
    return UpdatedTeamMember;
  }

  // Delete 팀 멤버
  async remove(id: string): Promise<void> {
    const TeamMember = await this.teamRepository.findOneBy({id})
    await this.s3Service.deleteFile(TeamMember.imageUrl);
    await this.teamRepository.delete({ id });
  }
}
