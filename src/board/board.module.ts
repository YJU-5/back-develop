import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { S3Module } from 'src/s3/s3.module';
import { BaseModule } from 'src/base/base.module';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), S3Module, BaseModule],
  controllers: [BoardController],
  providers: [BoardService, S3Service],
  exports: [],
})
export class BoardModule {}
