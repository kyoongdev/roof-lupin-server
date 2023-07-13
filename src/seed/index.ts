import { Category, Prisma, Space } from '@prisma/client';
import axios from 'axios';
import { range } from 'lodash';

import { PrismaService } from '@/database/prisma.service';

import { EncryptProvider } from '../common/encrypt';
import { OpenAPI } from '../interface/holiday.interface';
import { COUPON_CODE } from '../modules/coupon/constants';
import { DISCOUNT_TYPE_ENUM } from '../modules/coupon/validation';

import { seedHosts } from './host';
import { seedSpace } from './space';

export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.slogan.deleteMany({});
  await database.mainImage.deleteMany({});
  await database.location.deleteMany({});
  await database.category.deleteMany({});
  await database.holiday.deleteMany({});
  await database.coupon.deleteMany({});
  await seedHosts(database);

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');
  await Promise.all(
    range(1, 50).map(async (i) => {
      await database.user.create({
        data: {
          nickname: `user${i}`,
        },
      });
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
  await Promise.all(
    range(2023, 2025).map(async (i) => {
      await Promise.all(
        range(1, 13).map(async (j) => {
          const month = `${j}`.length === 1 ? `0${j}` : `${j}`;

          const response = await axios.get<OpenAPI>(
            `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${i}&solMonth=${month}&ServiceKey=${process.env.OPEN_API_KEY}`
          );

          const items = response.data.response?.body.items.item;

          if (items) {
            if (Array.isArray(items)) {
              await Promise.all(
                items.map(async (item) => {
                  const day = `${Number(`${item.locdate}`.slice(6))}`;
                  const isExist = await database.holiday.findFirst({
                    where: {
                      year: `${i}`,
                      month: `${j}`,
                      day,
                    },
                  });
                  if (!isExist)
                    await database.holiday.create({
                      data: {
                        year: `${i}`,
                        month: `${j}`,
                        day,
                        name: item.dateName,
                      },
                    });
                })
              );
            } else {
              const day = `${Number(`${items.locdate}`.slice(6))}`;
              const isExist = await database.holiday.findFirst({
                where: {
                  year: `${i}`,
                  month: `${j}`,
                  day,
                },
              });
              if (!isExist)
                await database.holiday.create({
                  data: {
                    year: `${i}`,
                    month: `${j}`,
                    day,
                    name: items.dateName,
                  },
                });
            }
          }
        })
      );
    })
  );

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
    },
  });

  const spaces: Space[] = await seedSpace(database);

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
      },
    });
  }
};
