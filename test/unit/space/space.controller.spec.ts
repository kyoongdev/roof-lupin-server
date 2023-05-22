import { Test, TestingModule } from '@nestjs/testing';
import { SpaceController } from 'modules/space/space.controller';

describe('SpaceController', () => {
  let controller: SpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceController],
    }).compile();

    controller = module.get<SpaceController>(SpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
