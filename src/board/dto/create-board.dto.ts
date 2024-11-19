import { Column, Entity } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
@Entity()
export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
