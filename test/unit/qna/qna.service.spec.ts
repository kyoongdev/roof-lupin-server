import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { QnAService } from '@/modules/qna/qna.service';

describe('QnaService', () => {
  let service: QnAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [QnAService, PrismaService],
    }).compile();

    service = module.get<QnAService>(QnAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
