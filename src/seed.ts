import { PrismaService } from '@/database/prisma.service';
export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  const host = await database.host.create({
    data: {
      name: 'testHost',
      userId: 'testHost',
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
        facilityIntroduction: 'facilityIntroduction',
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
