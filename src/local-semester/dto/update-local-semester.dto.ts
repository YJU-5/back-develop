import { CreateLocalSemesterDto } from './create-local-semester.dto';
import { Column } from 'typeorm';
import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLocalSemesterDto extends PartialType(
  CreateLocalSemesterDto,
) {
  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  existingImageUrls: string[];
}
