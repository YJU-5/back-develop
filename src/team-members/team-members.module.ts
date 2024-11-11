import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersController } from './team-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './entities/team-member.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember]), S3Module],
  controllers: [TeamMembersController],
  providers: [TeamMembersService],
  exports: [TeamMembersService],
})
export class TeamMembersModule {}
