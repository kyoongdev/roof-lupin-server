import { PrismaService } from '@/database/prisma.service';

export const seedSpace = async (database: PrismaService) => {
  const host = await database.host.create({
    data: {
      name: 'testHost',
      email: 'asdf',
      password: 'asdf',
      salt: 'asdf',
      gender: 1,
      phoneNumber: '01012341234',
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
        minHour: 12,
        overflowUserCount: 1234,
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
