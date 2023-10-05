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
      <h1>특별한 장소에서 이색 데이트 고민 중이라면?</h1><h4>옥상에서 열리는 영화제 모음</h4><p><br></p><p>여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. </p><p><br></p><h4>영화를 옥상에서 본다고? 폼 미쳤다이</h4><h2>전무후무 개띵작만 </h2><h2>모아서 상영하는</h2><p><br></p><p><img src="https://dev-image.rooflupin.com/16959744467561686736136673wallpaperbet.jpeg" alt="1686736136673wallpaperbet.ter.jpg" contenteditable="false">여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. </p><p>여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. 여기는 옥상 기획전 관련 텍스트가 들어갈 자리입니다. !</p>
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
