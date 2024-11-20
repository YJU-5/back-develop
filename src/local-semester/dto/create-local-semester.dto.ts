import { Column, Entity } from 'typeorm';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class CreateLocalSemesterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[];
}
