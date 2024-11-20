import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsString, IsOptional, IsEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @IsEmpty()
  readonly title?: string;

  @IsString()
  readonly content?: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[];
}
