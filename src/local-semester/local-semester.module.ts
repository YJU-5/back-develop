import { Module } from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { LocalSemesterController } from './local-semester.controller';
import { LocalSemester } from './entities/local-semester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LocalSemester]), S3Module, UserModule],
  controllers: [LocalSemesterController],
  providers: [LocalSemesterService],
  exports: [LocalSemesterService],
})
export class LocalSemesterModule {}
