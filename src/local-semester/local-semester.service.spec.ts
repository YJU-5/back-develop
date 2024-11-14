import { Test, TestingModule } from '@nestjs/testing';
import { LocalSemesterService } from './local-semester.service';

describe('LocalSemesterService', () => {
  let service: LocalSemesterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalSemesterService],
    }).compile();

    service = module.get<LocalSemesterService>(LocalSemesterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
