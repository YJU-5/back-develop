import { Column } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  age: number;

  @IsString()
  @IsNotEmpty()
  major: string;

  @IsString()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
