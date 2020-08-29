import { Test, TestingModule } from '@nestjs/testing';
import { InformationController } from './information.controller';

describe('Information Controller', () => {
  let controller: InformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationController],
    }).compile();

    controller = module.get<InformationController>(InformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
