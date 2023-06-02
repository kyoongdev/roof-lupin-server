import { PrismaService } from '@/database/prisma.service';

import { Encrypt } from './common/encrypt';
export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  const salt = Encrypt.createSalt();
  const password = Encrypt.hashPassword('1234', salt);
  const host = await database.host.create({
    data: {
      name: 'testHost',
      email: 'test@gmail.com',
      gender: 1,
      phoneNumber: '01012341234',
      password,
      salt,
    },
  });

  await database.user.create({
    data: {
      nickname: 'testUser',
    },
  });
  for (let i = 0; i < 100; i++) {
    await database.space.create({
      data: {
        buildingType: 1,
        description: 'test',
        title: `테스트 공간${i + 1}`,
        minHour: 1,
        overflowUserCount: 5,
        maxUser: 20,
        minUser: 1,
        overflowUserCost: i * 1000,
        spaceType: 1,
        size: i + 20,
        spaceIntroduction: 'spaceIntroduction',
        host: {
          connect: {
            id: host.id,
          },
        },
      },
    });
  }
};
