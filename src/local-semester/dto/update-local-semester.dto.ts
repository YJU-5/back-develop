import { CreateLocalSemesterDto } from './create-local-semester.dto';
import { Column } from 'typeorm';
import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateLocalSemesterDto extends PartialType(
  CreateLocalSemesterDto,
) {
  @IsString()
  @IsNotEmpty()
  readonly title?: string;

  @IsString()
  readonly content?: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
