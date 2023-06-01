import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { HostRepository } from '@/modules/host/host.repository';
import { QnARepository } from '@/modules/qna/qna.repository';
import { QnAService } from '@/modules/qna/qna.service';
import { SpaceRepository } from '@/modules/space/space.repository';
import { UserRepository } from '@/modules/user/user.repository';

describe('QnaService', () => {
  let service: QnAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [QnAService, SpaceRepository, QnARepository, UserRepository, HostRepository, PrismaService],
    }).compile();

    service = module.get<QnAService>(QnAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
