import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateLocalSemesterDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    type: String,
    description: '현지 타이틀',
    example: '오사카',
  })
  @Column({ length: 25 })
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    description: '현지 내용',
    example: '오사카에서 ~함',
  })
  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;
}
