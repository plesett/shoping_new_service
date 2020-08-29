import { Test, TestingModule } from '@nestjs/testing';
import { OngoingController } from './ongoing.controller';

describe('Ongoing Controller', () => {
  let controller: OngoingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OngoingController],
    }).compile();

    controller = module.get<OngoingController>(OngoingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
