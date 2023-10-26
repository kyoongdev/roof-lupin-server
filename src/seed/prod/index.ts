import { PrismaClient, Space } from '@prisma/client';

import { EncryptProvider } from '../../common/encrypt';
import { COUPON_CODE } from '../../modules/coupon/constants';
import { DISCOUNT_TYPE_ENUM } from '../../modules/coupon/validation';

import { seedAnnouncement } from './announcement';
import { seedFilter } from './filter';
import { seedHoliday } from './holiday';
import { seedHome } from './home';
import { seedService } from './service';
import { seedSpace } from './space';

export const seedDatabase = async (database: PrismaClient) => {
  const admin = await database.admin.findFirst({});
  const user = await database.user.findFirst({});
  const space = await database.space.findFirst({
    where: {
      title: '디난트 파티룸',
    },
    include: {
      rentalType: {
        include: {
          additionalServices: true,
        },
      },
    },
  });

  if (!user || !space) return;

  const reservation = await database.reservation.create({
    data: {
      year: 2023,
      month: 9,
      day: 10,
      userName: user.name ?? '홍길동',
      userPhoneNumber: user.phoneNumber ?? '01012345678',
      originalCost: 10000,
      totalCost: 10000,
      discountCost: 0,
      userCount: 3,
      vatCost: 1000,
      isApproved: true,
      payedAt: new Date(2023, 9, 10),
      payMethod: '토스페이',
      space: {
        connect: {
          id: space.id,
        },
      },
      code: `${new Date().getTime()}_HONG`,
      user: {
        connect: {
          id: user.id,
        },
      },
      rentalTypes: {
        create: [
          {
            startAt: 12,
            endAt: 32,
            rentalType: {
              connect: {
                id: space.rentalType[0].id,
              },
            },
          },
        ],
      },
      additionalServices: {
        create: [
          {
            additionalService: {
              connect: {
                id: space.rentalType[0].additionalServices[0].id,
              },
            },
            count: 1,
          },
        ],
      },
    },
  });

  const reservation2 = await database.reservation.create({
    data: {
      year: 2023,
      month: 9,
      day: 11,
      userName: user.name ?? '홍길동',
      userPhoneNumber: user.phoneNumber ?? '01012345678',
      originalCost: 10000,
      totalCost: 10000,
      discountCost: 0,
      userCount: 3,
      vatCost: 1000,
      isApproved: true,
      payedAt: new Date(2023, 9, 10),
      payMethod: '토스페이',
      space: {
        connect: {
          id: space.id,
        },
      },
      code: `${new Date().getTime()}_HONG`,
      user: {
        connect: {
          id: user.id,
        },
      },
      rentalTypes: {
        create: [
          {
            startAt: 12,
            endAt: 32,
            rentalType: {
              connect: {
                id: space.rentalType[0].id,
              },
            },
          },
        ],
      },
      additionalServices: {
        create: [
          {
            additionalService: {
              connect: {
                id: space.rentalType[0].additionalServices[0].id,
              },
            },
            count: 1,
          },
        ],
      },
    },
  });

  const reservation3 = await database.reservation.create({
    data: {
      year: 2023,
      month: 9,
      day: 13,
      userName: user.name ?? '홍길동',
      userPhoneNumber: user.phoneNumber ?? '01012345678',
      originalCost: 10000,
      totalCost: 10000,
      discountCost: 0,
      userCount: 3,
      vatCost: 1000,
      isApproved: true,
      payedAt: new Date(2023, 9, 10),
      payMethod: '토스페이',
      space: {
        connect: {
          id: space.id,
        },
      },
      code: `${new Date().getTime()}_HONG`,
      user: {
        connect: {
          id: user.id,
        },
      },
      rentalTypes: {
        create: [
          {
            startAt: 12,
            endAt: 32,
            rentalType: {
              connect: {
                id: space.rentalType[0].id,
              },
            },
          },
        ],
      },
      additionalServices: {
        create: [
          {
            additionalService: {
              connect: {
                id: space.rentalType[0].additionalServices[0].id,
              },
            },
            count: 1,
          },
        ],
      },
    },
  });

  await database.spaceReview.create({
    data: {
      content: '좋아요!!',
      score: 3,
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253781IMG_5925.jpeg',
              },
            },
            isBest: true,
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
        ],
      },
      space: {
        connect: {
          id: space.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      reservation: {
        connect: {
          id: reservation.id,
        },
      },
    },
  });

  await database.spaceReview.create({
    data: {
      content: '좋아요!!',
      score: 3,
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253781IMG_5925.jpeg',
              },
            },
            isBest: true,
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
        ],
      },
      space: {
        connect: {
          id: space.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      reservation: {
        connect: {
          id: reservation2.id,
        },
      },
    },
  });

  await database.spaceReview.create({
    data: {
      content: '좋아요!!',
      score: 3,
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253781IMG_5925.jpeg',
              },
            },
            isBest: true,
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
              },
            },
          },
        ],
      },
      space: {
        connect: {
          id: space.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      reservation: {
        connect: {
          id: reservation3.id,
        },
      },
    },
  });

  if (admin) return;

  await seedHoliday(database);
  await seedService(database);
  await seedFilter(database);
  await seedAnnouncement(database);

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');

  await database.searchRecommend.create({
    data: {
      content: '루프탑',
    },
  });
  await database.searchRecommend.create({
    data: {
      content: '글램핑',
    },
  });
  await database.searchRecommend.create({
    data: {
      content: '광진구',
    },
  });
  await database.searchRecommend.create({
    data: {
      content: '파티룸',
    },
  });
  await database.searchRecommend.create({
    data: {
      content: '옥상',
    },
  });

  await database.coupon.create({
    data: {
      name: '회원가입',
      code: COUPON_CODE.REGISTER,
      description: '회원가입시 발급되는 쿠폰입니다.',
      discountType: DISCOUNT_TYPE_ENUM.PERCENTAGE,
      discountValue: 10,
      isLupinPay: true,
      defaultDueDay: 14,
    },
  });
  await database.coupon.create({
    data: {
      name: '생일',
      code: COUPON_CODE.BIRTHDAY,
      description: '생일에 발급되는 쿠폰입니다.',
      discountType: DISCOUNT_TYPE_ENUM.PERCENTAGE,
      discountValue: 10,
      isLupinPay: true,
      defaultDueDay: 7,
    },
  });

  await database.admin.create({
    data: {
      name: '통합관리자',
      password: adminPassword,
      salt,
      userId: 'admin',
      isAccepted: true,
    },
  });

  const spaces: Space[] = await seedSpace(database);

  await seedHome(database, spaces);
};
