import { PrismaModule } from '@/database/prisma.module';
import { PrismaService } from '@/database/prisma.service';
import { MessageEvent } from '@/event/message';
import { CouponRepository } from '@/modules/coupon/coupon.repository';
import { HolidayService } from '@/modules/holiday/holiday.service';
import { HostBlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { HostOpenHourRepository } from '@/modules/host/open-hour/open-hour.repository';
import { HostSettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { HostSpaceHolidayRepository } from '@/modules/host/space-holiday/space-holiday.repository';
import { CreatePaymentPayloadDTO } from '@/modules/payment/dto';
import { PaymentService } from '@/modules/payment/payment.service';
import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';
import { RentalTypeService } from '@/modules/rental-type/rental-type.service';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { SpaceRepository } from '@/modules/space/space.repository';
import { FinanceProvider, TossPayProvider } from '@/utils';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';

describe('The AuthenticationService', () => {
  let paymentService: PaymentService;
  let database: PrismaService;
  let spaceRepository: SpaceRepository;
  let rentalTypeService: RentalTypeService;
  let couponRepository: CouponRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TossPayProvider,
        PaymentService,
        ReservationRepository,
        RentalTypeRepository,
        CouponRepository,
        HostBlockedTimeRepository,
        RentalTypeService,
        SpaceRepository,
        HolidayService,
        MessageEvent,
        HostSettlementRepository,
        FinanceProvider,
        HostOpenHourRepository,
        HostSpaceHolidayRepository,
        PrismaService,
        EventEmitter2,
        RentalTypeService,
      ],
      imports: [ConfigModule.forRoot()],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    database = module.get<PrismaService>(PrismaService);
    spaceRepository = module.get<SpaceRepository>(SpaceRepository);
    rentalTypeService = module.get<RentalTypeService>(RentalTypeService);
    couponRepository = module.get<CouponRepository>(CouponRepository);
  });

  it('정의됨', () => {
    expect(paymentService).toBeDefined();
  });

  describe('결제 테스트', () => {
    it('시간 상품 쿠폰  결제 생성', async () => {
      const user = await database.user.findFirst({});

      const coupon = await database.coupon.findFirst({
        where: {
          name: '회원가입',
        },
      });
      const userCoupon = await database.userCoupon.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          coupon: {
            connect: {
              id: coupon.id,
            },
          },
          usageDateEndAt: new Date(2025, 1, 1),
          usageDateStartAt: new Date(2021, 1, 1),
        },
      });
      const realCoupon = await couponRepository.findCoupon(coupon.id);
      const targetSpace = await database.space.findFirst({
        where: {
          title: '디난트 파티룸',
        },
      });

      const space = await spaceRepository.findSpace(targetSpace.id);
      const possibleRentalType = await rentalTypeService.findPossibleRentalTypesBySpaceId(space.id, {
        year: 2023,
        month: 10,
        day: 5,
      });
      const startAt = 12;
      const endAt = 19;
      const originalCost = possibleRentalType.time.timeCostInfos.reduce((acc, cur) => {
        if (cur.time >= startAt && cur.time <= endAt) {
          acc += cur.cost;
        }

        return acc;
      }, 0);
      const discountCost = realCoupon.getDiscountCost(originalCost);

      const payload = new CreatePaymentPayloadDTO({
        year: 2023,
        month: 10,
        day: 5,
        discountCost: discountCost.discountCost,
        originalCost,
        rentalTypes: [
          {
            rentalTypeId: possibleRentalType.time.id,
            startAt,
            endAt,
            additionalServices: [],
          },
        ],
        spaceId: space.id,
        totalCost: originalCost - discountCost.discountCost,
        userCount: 2,
        userName: '박용준',
        userPhoneNumber: '01012341234',
        userCouponIds: [userCoupon.id],
      });

      expect(await paymentService.createPaymentPayload(payload)).toBeDefined();
    });

    it('시간 상품 쿠폰 + 부가상품  결제 생성', async () => {
      const user = await database.user.findFirst({});

      const coupon = await database.coupon.findFirst({
        where: {
          name: '회원가입',
        },
      });
      const userCoupon = await database.userCoupon.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          coupon: {
            connect: {
              id: coupon.id,
            },
          },
          usageDateEndAt: new Date(2025, 1, 1),
          usageDateStartAt: new Date(2021, 1, 1),
        },
      });
      const realCoupon = await couponRepository.findCoupon(coupon.id);
      const targetSpace = await database.space.findFirst({
        where: {
          title: '디난트 파티룸',
        },
      });

      const space = await spaceRepository.findSpace(targetSpace.id);
      const possibleRentalType = await rentalTypeService.findPossibleRentalTypesBySpaceId(space.id, {
        year: 2023,
        month: 10,
        day: 6,
      });
      const startAt = 12;
      const endAt = 19;
      const additionalService = possibleRentalType.time.additionalServices[0];
      const originalCost =
        possibleRentalType.time.timeCostInfos.reduce((acc, cur) => {
          if (cur.time >= startAt && cur.time <= endAt) {
            acc += cur.cost;
          }

          return acc;
        }, 0) + additionalService.cost;

      const discountCost = realCoupon.getDiscountCost(originalCost);

      const payload = new CreatePaymentPayloadDTO({
        year: 2023,
        month: 10,
        day: 6,
        discountCost: discountCost.discountCost,
        originalCost,
        rentalTypes: [
          {
            rentalTypeId: possibleRentalType.time.id,
            startAt,
            endAt,
            additionalServices: [
              {
                id: additionalService.id,
                count: 1,
              },
            ],
          },
        ],
        spaceId: space.id,
        totalCost: originalCost - discountCost.discountCost,
        userCount: 2,
        userName: '박용준',
        userPhoneNumber: '01012341234',
        userCouponIds: [userCoupon.id],
      });

      expect(await paymentService.createPaymentPayload(payload)).toBeDefined();
    });
  });
});
