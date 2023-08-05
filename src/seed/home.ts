import { PrismaClient, Space } from '@prisma/client';

export const seedHome = async (database: PrismaClient, spaces: Space[]) => {
  const category1 = await database.contentCategory.create({
    data: {
      highlight: '8월 인기',
      name: '기획전',
    },
  });

  const exhibition = await database.exhibition.create({
    data: {
      title: '도심 속 일탈 가능한 글램핑 루프탑',
      description: '도심 속 일탈 가능한 글램핑 루프탑',
      content: `
      <p>도심 속 일탈 가능한 글램핑 루프탑</p>
      `,
      startAt: new Date(),
      endAt: new Date(),
      thumbnail: 'https://dev-image.rooflupin.com/1688714930777rooftop-cafe.jpeg',
    },
  });

  const ranking = await database.ranking.create({
    data: {
      name: '20대 초반 유저 PICK!',
      description: '2023년도 상반기 인기만점 옥상 공간',
    },
  });

  await Promise.all(
    spaces.map(async (spaces, index) => {
      if (index < 5) {
        await database.contentCategory.update({
          where: {
            id: category1.id,
          },
          data: {
            spaces: {
              create: [
                {
                  space: {
                    connect: {
                      id: spaces.id,
                    },
                  },
                  orderNo: index,
                },
              ],
            },
          },
        });
        await database.ranking.update({
          where: {
            id: ranking.id,
          },
          data: {
            spaces: {
              create: [
                {
                  space: {
                    connect: {
                      id: spaces.id,
                    },
                  },
                  orderNo: index,
                },
              ],
            },
          },
        });
        await database.exhibition.update({
          where: {
            id: exhibition.id,
          },
          data: {
            spaces: {
              create: [
                {
                  orderNo: index,
                  space: {
                    connect: {
                      id: spaces.id,
                    },
                  },
                },
              ],
            },
          },
        });
      }
    })
  );

  await database.homeContents.create({
    data: {
      orderNo: 1,
      contentsCategory: {
        connect: {
          id: category1.id,
        },
      },
    },
  });

  await database.homeContents.create({
    data: {
      orderNo: 2,
      ranking: {
        connect: {
          id: ranking.id,
        },
      },
    },
  });

  await database.homeContents.create({
    data: {
      orderNo: 3,
      exhibition: {
        connect: {
          id: exhibition.id,
        },
      },
    },
  });
};
