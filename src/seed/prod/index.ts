import { PrismaClient } from '@prisma/client';

import { EncryptProvider } from '../../common/encrypt';

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
  await database.frequentQuestion.deleteMany({});
  await database.image.deleteMany({});
  // await database.searchRecommend.deleteMany({});
  // await database.locationFilterGroup.deleteMany({});
  // await database.icon.deleteMany({});
  // await database.serviceTitle.deleteMany({});
  const admin = await database.admin.findFirst({});

  if (admin) return;

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');

  await database.admin.create({
    data: {
      name: '통합관리자',
      password: adminPassword,
      salt,
      userId: 'admin',
      isAccepted: true,
    },
  });
};
