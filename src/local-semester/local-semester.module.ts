import { Module } from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { LocalSemesterController } from './local-semester.controller';
import { LocalSemester } from './entities/local-semester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LocalSemester])],
  controllers: [LocalSemesterController],
  providers: [LocalSemesterService],
  exports: [LocalSemesterService],
})
export class LocalSemesterModule {}
