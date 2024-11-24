import { Column } from 'typeorm';
import { IsString, IsOptional, IsEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsEmpty()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[];
}
