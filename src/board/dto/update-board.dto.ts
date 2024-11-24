import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsOptional } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  existingImageUrls: string[];
}
