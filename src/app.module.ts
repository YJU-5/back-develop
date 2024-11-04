import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeamMembersModule } from './team-members/team-members.module';
import { LocalSemesterModule } from './local-semester/local-semester.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamMember } from './team-members/entities/team-member.entity';
import { LocalSemester } from './local-semester/entities/local-semester.entity';
import { Board } from './board/entities/board.entity';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TeamMember, LocalSemester, Board], // 엔티티를 여기에 추가
        synchronize: true,
      }),
    }),
    TeamMembersModule,
    LocalSemesterModule,
    BoardModule,
    AuthModule,
    UserModule,
    CommentModule,
  ],
})
export class AppModule {}
