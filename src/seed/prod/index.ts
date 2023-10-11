import { PrismaClient, Space, User } from '@prisma/client';
import { range } from 'lodash';

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
  await database.serviceTitle.deleteMany({});

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
