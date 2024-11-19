import { Column, Entity } from 'typeorm';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
@Entity()
export class CreateLocalSemesterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  file: string[];
}
