import { Test, TestingModule } from '@nestjs/testing';

import { QnAController } from '@/modules/qna/qna.controller';

describe('QnaController', () => {
  let controller: QnAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnAController],
    }).compile();

    controller = module.get<QnAController>(QnAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
