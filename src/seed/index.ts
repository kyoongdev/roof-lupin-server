import { PrismaClient, Space, User } from '@prisma/client';
import { range } from 'lodash';

import { EncryptProvider } from '../common/encrypt';
import { COUPON_CODE } from '../modules/coupon/constants';
import { DISCOUNT_TYPE_ENUM } from '../modules/coupon/validation';

import { seedAnnouncement } from './announcement';
import { seedFilter } from './filter';
import { seedHoliday } from './holiday';
import { seedHome } from './home';
import { seedHosts } from './host';
import { seedService } from './service';
import { seedSpace } from './space';

export const seedDatabase = async (database: PrismaClient) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.location.deleteMany({});
  await database.category.deleteMany({});
  await database.announcement.deleteMany({});
  await database.coupon.deleteMany({});
  await database.homeContents.deleteMany({});
  await database.curation.deleteMany({});
  await database.ranking.deleteMany({});
  await database.fAQ.deleteMany({});
  await database.spaceHoliday.deleteMany({});
  await database.exhibition.deleteMany({});
  await database.locationFilterGroup.deleteMany({});
  await database.icon.deleteMany({});

  await seedHosts(database);
  await seedHoliday(database);
  await seedService(database);
  await seedFilter(database);
  await seedAnnouncement(database);

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');
  const users: User[] = [];

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

  await Promise.all(
    range(1, 50).map(async (i) => {
      const user = await database.user.create({
        data: {
          nickname: `user${i}`,
          name: `테스트유저${i}`,
          gender: i % 2 === 0 ? 1 : 2,
          email: `testUser${i}@gmail.com`,
          setting: {
            create: {},
          },
        },
      });

      await Promise.all(
        range(1, 50).map(async (i) => {
          await database.userAlarm.create({
            data: {
              title: `테스트유저${i}의 알림`,
              content: `테스트유저${i}의 알림 내용`,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        })
      );
      await database.fAQ.create({
        data: {
          question: `테스트유저${i}의 질문`,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      if (i < 20) {
        await database.frequentQuestion.create({
          data: {
            question: `자주 묻는 질문 ${i}`,
            answer: `자주 묻는 질문 ${i}의 답변`,
          },
        });
      }
      users.push(user);
    })
  );
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

  await database.coupon.create({
    data: {
      name: '코드 쿠폰',
      code: COUPON_CODE.CODE_TEST,
      description: '코드 발급 쿠폰 테스트',
      discountType: DISCOUNT_TYPE_ENUM.PERCENTAGE,
      discountValue: 20,
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

  const testUser = await database.user.create({
    data: {
      nickname: 'testUser',
    },
  });

  await database.user.create({
    data: {
      nickname: 'testUser2',
      name: '테스트유저',
      gender: 1,
    },
  });

  const spaces: Space[] = await seedSpace(users, database);

  await seedHome(database, spaces);
  for (let i = 0; i < 1; i++) {
    await database.curation.create({
      data: {
        title: `이달의 공간`,
        subTitle: `더운 여름 속 루프라이프`,
        content: `더운 여름 속, 루프라이프를 즐기세요!`,
        thumbnail: 'https://dev-image.rooflupin.com/1688714930777rooftop-cafe.jpeg',
        isMain: true,
        user: {
          connect: {
            id: testUser.id,
          },
        },
        spaces: {
          create: [
            {
              space: {
                connect: {
                  id: spaces[0].id,
                },
              },
              orderNo: i,
            },
          ],
        },
      },
    });
  }
};
