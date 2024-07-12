import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCodeService } from './registration-code.service';

describe('RegistrationCodeService', () => {
  let service: RegistrationCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationCodeService],
    }).compile();

    service = module.get<RegistrationCodeService>(RegistrationCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
