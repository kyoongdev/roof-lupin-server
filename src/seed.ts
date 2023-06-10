import { Space } from '@prisma/client';
import schedule from 'node-schedule';

import { PrismaService } from '@/database/prisma.service';

import { Encrypt } from './common/encrypt';

export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.slogan.deleteMany({});
  await database.mainImage.deleteMany({});
  const salt = Encrypt.createSalt();
  const hostPassword = Encrypt.hashPassword('1234', salt);
  const adminPassword = Encrypt.hashPassword(salt, 'admin1234');

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
  const host = await database.host.create({
    data: {
      name: 'testHost',
      email: 'test@gmail.com',
      gender: 1,
      phoneNumber: '01012341234',
      password: hostPassword,
      salt,
    },
  });

  const testUser = await database.user.create({
    data: {
      nickname: 'testUser',
    },
  });

  const spaces: Space[] = [];
  for (let i = 0; i < 100; i++) {
    await database.userAlarm.create({
      data: {
        user: {
          connect: {
            id: testUser.id,
          },
        },
        title: `테스트 알람${i + 1}`,
        content: `테스트 알람 내용${i + 1}`,
        isRead: i % 2 === 0,
      },
    });

    const space = await database.space.create({
      data: {
        thumbnail: 'thumbnail',
        minCost: 10000,
        minSize: 12,
        buildingType: 1,
        description: 'test',
        title: `테스트 공간${i + 1}`,

        overflowUserCount: 5,
        maxUser: 20,
        minUser: 1,
        overflowUserCost: i * 1000,
        spaceType: 1,

        host: {
          connect: {
            id: host.id,
          },
        },
        rentalType: {
          create: [
            {
              baseCost: (i + 1) * 20,
              startAt: 10,
              endAt: 15,
              name: '테스트',
              rentalType: 1,
              baseHour: 12,
            },
            {
              baseCost: (i + 1) * 22,
              startAt: 10,
              endAt: 15,
              name: '테스트2',
              rentalType: 1,
              baseHour: 12,
            },
          ],
        },
      },
    });
    spaces.push(space);
  }

  const mainCategory1 = await database.mainCategory.create({
    data: {
      highlightTitle: '8월 인기',
      title: '기획전',
    },
  });
  const mainCategory2 = await database.mainCategory.create({
    data: {
      highlightTitle: '루프탑 바',
      title: '인기 10위',
    },
  });
  const mainCategory3 = await database.mainCategory.create({
    data: {
      highlightTitle: '여름 휴가',
      title: '옥상 바베큐',
    },
  });
  const mainCategory4 = await database.mainCategory.create({
    data: {
      highlightTitle: '루프루팡 픽!',
      title: '최고의 옥상',
    },
  });
  const mainCategory5 = await database.mainCategory.create({
    data: {
      highlightTitle: '옥상에서 즐기는',
      title: '영화 감상',
    },
  });

  await Promise.all(
    spaces.map(async (spaces, index) => {
      if (index < 5) {
        await database.mainCategory.update({
          where: {
            id: mainCategory1.id,
          },
          data: {
            spaces: {
              connect: {
                id: spaces.id,
              },
            },
          },
        });
      } else if (index < 10) {
        await database.mainCategory.update({
          where: {
            id: mainCategory2.id,
          },
          data: {
            spaces: {
              connect: {
                id: spaces.id,
              },
            },
          },
        });
      } else if (index < 15) {
        await database.mainCategory.update({
          where: {
            id: mainCategory3.id,
          },
          data: {
            spaces: {
              connect: {
                id: spaces.id,
              },
            },
          },
        });
      } else if (index < 20) {
        await database.mainCategory.update({
          where: {
            id: mainCategory4.id,
          },
          data: {
            spaces: {
              connect: {
                id: spaces.id,
              },
            },
          },
        });
      } else if (index < 25) {
        await database.mainCategory.update({
          where: {
            id: mainCategory5.id,
          },
          data: {
            spaces: {
              connect: {
                id: spaces.id,
              },
            },
          },
        });
      }
    })
  );
};
