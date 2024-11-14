import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TeamMembersModule } from './team-members/team-members.module';
import { LocalSemesterModule } from './local-semester/local-semester.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { S3Module } from './s3/s3.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TeamMembersModule,
    LocalSemesterModule,
    BoardModule,
    AuthModule,
    UserModule,
    CommentModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
