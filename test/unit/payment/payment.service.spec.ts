import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { HolidayService } from '@/modules/holiday/holiday.service';
import { BlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { OpenHourRepository } from '@/modules/host/open-hour/open-hour.repository';
import { HostReviewService } from '@/modules/host/review/review.service';
import { SettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { SpaceHolidayRepository } from '@/modules/host/space-holiday/space-holiday.repository';
import { PaymentService } from '@/modules/payment/payment.service';
import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { RentalTypeService } from '@/modules/rental-type/rental-type.service';
import { CreatePaymentDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { ReviewRepository } from '@/modules/review/review.repository';
import { ReviewService } from '@/modules/review/review.service';
import { SpaceDTO } from '@/modules/space/dto';
import { SpaceRepository } from '@/modules/space/space.repository';
import { seedDatabase } from '@/seed';
import { FinanceProvider, TossPayProvider } from '@/utils';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('Payment Service', () => {
  let service: PaymentService;
  let rentalTypeService: RentalTypeService;
  let database: PrismaService;
  const reservationOrderIds: string[] = [];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ReviewRepository,
        PrismaService,
        HostReviewService,
        SpaceRepository,
        ReservationRepository,
        RentalTypeRepository,
        CouponRepository,
        TossPayProvider,
        FCMEvent,
        SettlementRepository,
        FinanceProvider,
        BlockedTimeRepository,
        HolidayService,
        SpaceHolidayRepository,
        OpenHourRepository,
        SpaceDTO,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    rentalTypeService = module.get<RentalTypeService>(RentalTypeService);
    database = module.get<PrismaService>(PrismaService);
    await database.$connect();
    await seedDatabase(database);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(database).toBeDefined();
  });

  describe('결제 후 정산 테이블 조회', () => {
    it('결제 생성', async () => {
      const user = await database.user.findFirst({});
      const space = await database.space.findFirst({
        where: {
          isImmediateReservation: true,
        },
      });
      const rentalTypes = await rentalTypeService.findPossibleRentalTypesBySpaceId(space.id, {
        year: '2023',
        month: '9',
        day: '4',
      });
      const rentalType = rentalTypes.package.at(-1);
      const result = await service.createPaymentPayload(
        user.id,
        new CreatePaymentDTO({
          year: '2023',
          month: '9',
          day: '4',
          discountCost: 0,
          originalCost: rentalType.baseCost,
          totalCost: rentalType.baseCost,
          rentalTypes: [
            {
              startAt: rentalType.startAt,
              endAt: rentalType.endAt,
              rentalTypeId: rentalType.id,
            },
          ],
          spaceId: space.id,
          userCount: 2,
          userName: '박용준',
          userPhoneNumber: '01040597883',
        })
      );
      reservationOrderIds.push(result.orderId);
      expect(result).toBeDefined();
    });
  });

  afterAll(async () => {
    await Promise.all(
      reservationOrderIds.map(async (orderId) => {
        await database.reservation.delete({
          where: {
            orderId,
          },
        });
      })
    );
  });
});
