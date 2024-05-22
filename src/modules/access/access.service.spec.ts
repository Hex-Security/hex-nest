import { Test, TestingModule } from '@nestjs/testing';
import { AccessService } from './access.service';

describe('AccessService', () => {
  let service: AccessService;

  class MockAccessRepo {
    find = jest.fn();
    findOne = jest.fn();
    create = jest.fn();
    save = jest.fn();
    update = jest.fn();
    delete = jest.fn();
  }

  class MockHouseService {
    findOneByOwner = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessService],
    }).compile();

    service = module.get<AccessService>(AccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
