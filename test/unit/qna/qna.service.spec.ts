import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'database/prisma.service';
import { QnaService } from 'modules/qna/qna.service';

describe('QnaService', () => {
  let service: QnaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [QnaService, PrismaService],
    }).compile();

    service = module.get<QnaService>(QnaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
