import { Test, TestingModule } from '@nestjs/testing';
import { LocalSemesterController } from './local-semester.controller';
import { LocalSemesterService } from './local-semester.service';

describe('LocalSemesterController', () => {
  let controller: LocalSemesterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalSemesterController],
      providers: [LocalSemesterService],
    }).compile();

    controller = module.get<LocalSemesterController>(LocalSemesterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
