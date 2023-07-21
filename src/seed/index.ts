import { PrismaClient, Space, User } from '@prisma/client';
import { range } from 'lodash';

import { EncryptProvider } from '../common/encrypt';
import { COUPON_CODE } from '../modules/coupon/constants';
import { DISCOUNT_TYPE_ENUM } from '../modules/coupon/validation';

import { seedHoliday } from './holiday';
import { seedHome } from './home';
import { seedHosts } from './host';
import { seedSpace } from './space';

export const seedDatabase = async (database: PrismaClient) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.slogan.deleteMany({});
  await database.mainImage.deleteMany({});
  await database.location.deleteMany({});
  await database.category.deleteMany({});

  await database.coupon.deleteMany({});
  await database.homeContents.deleteMany({});

  await seedHosts(database);
  await seedHoliday(database);

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');
  const users: User[] = [];
  await Promise.all(
    range(1, 50).map(async (i) => {
      users.push(
        await database.user.create({
          data: {
            nickname: `user${i}`,
            name: `테스트유저${i}`,
            gender: i % 2 === 0 ? 1 : 2,
            email: `testUser${i}@gmail.com`,
          },
        })
      );
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

  await database.mainImage.create({
    data: {
      isDefault: true,
      url: 'https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg',
    },
  });
  await database.slogan.create({
    data: {
      isDefault: true,
      content: '도심 속 루프라이프의 시작',
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
  for (let i = 0; i < 5; i++) {
    await database.curation.create({
      data: {
        title: `테스트 큐레이션${i + 1}`,
        subTitle: `테스트 큐레이션 서브 타이틀${i + 1}`,
        content: `테스트 큐레이션 내용${i + 1}`,
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
                  id: spaces[i].id,
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
