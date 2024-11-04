import { Module } from '@nestjs/common';
import { LocalSemesterService } from './local-semester.service';
import { LocalSemesterController } from './local-semester.controller';

@Module({
  controllers: [LocalSemesterController],
  providers: [LocalSemesterService],
})
export class LocalSemesterModule {}
