import { Column } from 'typeorm';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateLocalSemesterDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[];
}
