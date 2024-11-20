import { Column, Entity } from 'typeorm';
import { IsString, IsOptional, IsEmpty } from 'class-validator';
@Entity()
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
