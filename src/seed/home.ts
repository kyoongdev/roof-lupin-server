import { Space } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

export const seedHome = async (database: PrismaService, spaces: Space[]) => {
  const category1 = await database.contentCategory.create({
    data: {
      highlight: '8월 인기',
      name: '기획전',
    },
  });
  const category2 = await database.contentCategory.create({
    data: {
      highlight: '루프탑 바',
      name: '인기 10위',
    },
  });
  const category3 = await database.contentCategory.create({
    data: {
      highlight: '여름 휴가',
      name: '옥상 바베큐',
    },
  });
  const category4 = await database.contentCategory.create({
    data: {
      highlight: '루프루팡 픽!',
      name: '최고의 옥상',
    },
  });
  const category5 = await database.contentCategory.create({
    data: {
      highlight: '옥상에서 즐기는',
      name: '영화 감상',
    },
  });

  const exhibition = await database.exhibition.create({
    data: {
      title: '특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!',
      description: '특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!',
      content: `
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      `,
      startAt: new Date(),
      endAt: new Date(),
      thumbnail: 'https://dev-image.rooflupin.com/1688714930777rooftop-cafe.jpeg',
    },
  });

  const ranking = await database.ranking.create({
    data: {
      name: '구매율 TOP 5',
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
      } else if (index < 10) {
        await database.contentCategory.update({
          where: {
            id: category2.id,
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
                },
              ],
            },
          },
        });
      } else if (index < 15) {
        await database.contentCategory.update({
          where: {
            id: category3.id,
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
      } else if (index < 20) {
        await database.contentCategory.update({
          where: {
            id: category4.id,
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
                },
              ],
            },
          },
        });
      } else if (index < 25) {
        await database.contentCategory.update({
          where: {
            id: category5.id,
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
      contentsCategories: {
        connect: [
          {
            id: category1.id,
          },
          {
            id: category2.id,
          },
        ],
      },
    },
  });

  await database.homeContents.create({
    data: {
      orderNo: 2,
      rankings: {
        connect: {
          id: ranking.id,
        },
      },
    },
  });

  const thirdHome = await database.homeContents.create({
    data: {
      orderNo: 3,
      contentsCategories: {
        connect: [
          {
            id: category3.id,
          },
        ],
      },
    },
  });

  const firthHome = await database.homeContents.create({
    data: {
      orderNo: 4,
      exhibitions: {
        connect: {
          id: exhibition.id,
        },
      },
    },
  });

  const fifthHome = await database.homeContents.create({
    data: {
      orderNo: 5,
      contentsCategories: {
        connect: [
          {
            id: category4.id,
          },
          {
            id: category5.id,
          },
        ],
      },
    },
  });
};
