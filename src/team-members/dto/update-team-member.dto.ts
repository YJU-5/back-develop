import { CreateTeamMemberDto } from './create-team-member.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}
