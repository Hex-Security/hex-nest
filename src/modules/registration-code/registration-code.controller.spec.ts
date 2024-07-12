import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCodeController } from './registration-code.controller';

describe('RegistrationCodeController', () => {
  let controller: RegistrationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationCodeController],
    }).compile();

    controller = module.get<RegistrationCodeController>(RegistrationCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
