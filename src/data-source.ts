import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
  // 파일 절대경로, 하위 모든폴더 탐색, .entity로 끝나고 확장자가.ts or .js
  entities: [__dirname + '/**/*.entity{.ts,.js}'], //DB 경로 전부
  migrations: [__dirname + '/path-to-migrations-dir/*.ts'],
  subscribers: [],
  migrationsTableName: 'migrations',
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));
