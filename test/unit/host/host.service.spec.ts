import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'database/prisma.service';
import { HostService } from 'modules/host/host.service';

describe('HostService', () => {
  let service: HostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [HostService, PrismaService],
    }).compile();

    service = module.get<HostService>(HostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
