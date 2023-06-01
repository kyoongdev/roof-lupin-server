import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { ReportRepository } from '@/modules/report/report.repository';
import { ReportService } from '@/modules/report/report.service';
import { SpaceRepository } from '@/modules/space/space.repository';
import { UserRepository } from '@/modules/user/user.repository';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ReportService, ReportRepository, SpaceRepository, UserRepository, PrismaService],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
