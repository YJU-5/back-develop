import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Board } from './board/entities/board.entity';
import { Comment } from './comment/entities/comment.entity';
import { TeamMember } from './team-members/entities/team-member.entity';
import { LocalSemester } from './local-semester/entities/local-semester.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT, 10),
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [TeamMember, LocalSemester, Board, Comment, User],
  migrations: [__dirname + '/path-to-migrations-dir/*.ts'],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
