import { Board } from 'src/board/entities/board.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TeamMember extends Board {
  @Column()
  teamMemberName: string;
}
