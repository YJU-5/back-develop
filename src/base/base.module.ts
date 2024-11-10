import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseController } from './base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'src/s3/s3.module';
import { Board } from 'src/board/entities/board.entity';
import { S3Service } from 'src/s3/s3.service';
//import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), S3Module],
  controllers: [BaseController],
  providers: [BaseService, BaseController, S3Service],
  exports: [TypeOrmModule],
})
export class BaseModule {}
