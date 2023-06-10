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
        title: `루프탑 공간${i + 1}`,
        description:
          "소갈비를 이용한 한국 요리. 돼지갈비를 이용한 갈비찜도 있지만, 그냥 '갈비찜' 하면 보통은 소갈비를 이용한 찜 요리를 의미한다. 그러나 돼지갈비가 더 싸기 때문에 돼지갈비찜을 만드는 집안도 많은 편. 명절이나 잔칫상에 올라가는 음식이다. 20세기 중반까지는 소득 수준이 낮고 소고기 가격이 높았기 때문에 어느 정도 경제적 여유가 있는 집이 아니면 먹기 어려운 부자 음식이었다. 하지만 지금은 소득 수준이 올라가고 한우보다 저렴한 수입육이 많이 들어오면서 이전보다 가격 부담은 많이 줄었다. 물론 한우 갈비찜은 여전히 고가의 음식이다.갈비'찜'이라고는 하지만 정확히 말하자면 찜이 아니라 조림이나 스튜에 가까운 조리방식을 쓴다. 원래 찐다는 건 물과 직접 닿지 않고 아래에서 올라오는 증기로 익힌다는 뜻이니까.[1] 비슷한 계열의 요리로 장조림[2], 닭으로 만들면 닭찜일 것 같지만, 실제로는 찜닭이 조리법에 더 가까운 음식이다. 중국에서도 갈비찜이 대중적인 반찬거리로 팔고, 필리핀의 돼지 아도보와, 말레이시아. 인도네시아 른당이나, 일본의 니쿠쟈가도 갈비찜과 비슷한 요리이고, 각 나라별로 맛의 차이는 조금씩 있지만 간장을 쓴다는 점은 비슷하기 때문에 이들나라 국민들에게도 한국의 갈비찜은 익숙해서 먹을만한 요리이다.",
        spaceType: 1,
        thumbnail: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
        minUser: 1,
        maxUser: 20,
        overflowUserCost: i * 1000,
        overflowUserCount: 5,
        buildingType: 1,
        images: {
          create: [
            {
              image: {
                create: {
                  url: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
                },
              },
            },
          ],
        },
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
