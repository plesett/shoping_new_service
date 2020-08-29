import { Test, TestingModule } from '@nestjs/testing';
import { WinningController } from './winning.controller';

describe('Winning Controller', () => {
  let controller: WinningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinningController],
    }).compile();

    controller = module.get<WinningController>(WinningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
