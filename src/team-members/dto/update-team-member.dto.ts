import { CreateTeamMemberDto } from './create-team-member.dto';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
  @IsString()
  @IsNotEmpty()
  readonly title?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age?: number;

  @IsString()
  @IsNotEmpty()
  readonly major?: string;

  @IsString()
  readonly content?: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
