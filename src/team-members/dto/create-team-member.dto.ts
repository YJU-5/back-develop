import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { CreateBoardDto } from 'src/board/dto/create-board.dto';

@Entity()
export class CreateTeamMemberDto extends CreateBoardDto {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @ApiProperty({
  //   required: true,
  //   type: String,
  //   description: '팀 멤버 이름',
  //   example: '팀 멤버 이름',
  // })
  // @Column({ length: 25 })
  // title: string;

  // @ApiProperty({
  //   required: true,
  //   type: String,
  //   description: '팀 멤버 내용',
  //   example: '좌우명 : 잘 살자',
  // })
  // @Column()
  // content: string;

  // @Column({ nullable: true })
  // imageUrl: string;
}
