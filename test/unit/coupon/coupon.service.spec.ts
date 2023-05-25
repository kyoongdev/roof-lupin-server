import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { CouponService } from '@/modules/coupon/coupon.service';

describe('CouponService', () => {
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [CouponService, PrismaService],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
