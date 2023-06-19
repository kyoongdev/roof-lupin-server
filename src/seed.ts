import { Prisma, Space } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { Encrypt } from './common/encrypt';

export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.slogan.deleteMany({});
  await database.mainImage.deleteMany({});
  await database.location.deleteMany({});
  await database.category.deleteMany({});
  const salt = Encrypt.createSalt();
  const hostPassword = Encrypt.hashPassword(salt, '1234');
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

  for (let i = 0; i < 5; i++) {
    await database.curation.create({
      data: {
        title: `테스트 큐레이션${i + 1}`,
        subTitle: `테스트 큐레이션 서브 타이틀${i + 1}`,
        content: `테스트 큐레이션 내용${i + 1}`,
        thumbnail: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
        isMain: true,
        user: {
          connect: {
            id: testUser.id,
          },
        },
      },
    });
    await database.category.create({
      data: {
        name: `카테고리${i + 1}`,
        iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
        isHome: true,
        isRecommended: i === 4,
      },
    });
  }

  for (let i = 0; i < 50; i++) {
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
        thumbnail: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
        minUser: 1,
        maxUser: 20,
        overflowUserCost: i * 1000,
        overflowUserCount: 5,
        buildingType: 1,
        minSize: 12,
        averageScore: new Prisma.Decimal(4.0),
        sizes: {
          create: [
            {
              size: 12,
              floor: '1층',
            },
          ],
        },
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
        refundPolicies: {
          create: [
            {
              dueDate: 1,
              dueDateType: 3,
              refundRate: 10,
            },
            {
              dueDate: 2,
              dueDateType: 3,
              refundRate: 20,
            },
            {
              dueDate: 3,
              dueDateType: 3,
              refundRate: 50,
            },
          ],
        },
        cautions: {
          create: [
            {
              content: '테스트 주의사항1',
            },
            {
              content: '테스트 주의사항2',
            },
            {
              content: '테스트 주의사항3',
            },
            {
              content: '테스트 주의사항4',
            },
          ],
        },
        rentalType: {
          create: [
            {
              baseCost: 1000,
              startAt: 14,
              endAt: 22,
              name: '시간대여',
              rentalType: 1,
              baseHour: 2,
              timeCostInfo: {
                create: [
                  {
                    cost: 1000,
                    time: 14,
                  },
                  {
                    cost: 1000,
                    time: 15,
                  },
                  {
                    cost: 1000,
                    time: 16,
                  },
                  {
                    cost: 2000,
                    time: 17,
                  },
                  {
                    cost: 2000,
                    time: 18,
                  },
                  {
                    cost: 2000,
                    time: 19,
                  },
                  {
                    cost: 2000,
                    time: 20,
                  },
                  {
                    cost: 2000,
                    time: 21,
                  },
                ],
              },
            },
            {
              baseCost: 100000,
              startAt: 13,
              endAt: i % 50 === 0 ? 24 : 22,
              name: '패키지 대여',
              rentalType: 2,
              baseHour: 6,
            },
          ],
        },
        location: {
          create: {
            roadAddress: '경기도 성남시 분당구 불정로 6 그린팩토리',
            jibunAddress: '경기도 성남시 분당구 정자동 178-1 그린팩토리',
            lng: '127.10522081658463',
            lat: '37.35951219616309',
          },
        },
        buildings: {
          create: [
            {
              building: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '주차 5대',
                },
              },
            },
            {
              building: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '3층',
                },
              },
            },
            {
              building: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '엘리베이터 없음',
                },
              },
            },
          ],
        },
        services: {
          create: [
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '바베큐',
                },
              },
            },
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '반려동물 동반가능',
                },
              },
            },
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '전기',
                },
              },
            },
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '금연',
                },
              },
            },
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '인터넷/WIFI',
                },
              },
            },
            {
              service: {
                create: {
                  iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                  name: '장비대여',
                },
              },
            },
          ],
        },
        hashtags: {
          create: [
            {
              hashtag: {
                create: {
                  name: '테스트해시태그1',
                },
              },
            },
          ],
        },
        publicTransportations: {
          create: [
            {
              name: '부산역',
              timeTaken: 25,
            },
          ],
        },
        reviews: {
          create: [
            {
              content: '오우 재밌어요',
              score: 4,
              isBest: true,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
              images: {
                create: [
                  {
                    image: {
                      create: {
                        url: 'https://i.pinimg.com/564x/97/8e/ae/978eae2548d1aa7c6e5a73db98c0fa31.jpg',
                      },
                    },
                  },
                ],
              },
              answers: {
                create: [
                  {
                    content: '답변입니다~',
                    host: {
                      connect: {
                        id: host.id,
                      },
                    },
                  },
                ],
              },
            },
            {
              content: '오우 재밌어요22',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
              answers: {
                create: [
                  {
                    content: '답변입니다~',
                    host: {
                      connect: {
                        id: host.id,
                      },
                    },
                  },
                ],
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
              answers: {
                create: [
                  {
                    content: '답변입니다~',
                    host: {
                      connect: {
                        id: host.id,
                      },
                    },
                  },
                ],
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
            },
            {
              content: '오우 재밌어요23',
              score: 4,
              user: {
                connect: {
                  id: testUser.id,
                },
              },
              answers: {
                create: [
                  {
                    content: '답변입니다~',
                    host: {
                      connect: {
                        id: host.id,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        host: {
          connect: {
            id: host.id,
          },
        },
      },
    });

    spaces.push(space);
  }

  const category1 = await database.category.create({
    data: {
      highlight: '8월 인기',
      name: '기획전',
      isContent: true,
    },
  });
  const category2 = await database.category.create({
    data: {
      highlight: '루프탑 바',
      name: '인기 10위',
      isContent: true,
    },
  });
  const category3 = await database.category.create({
    data: {
      highlight: '여름 휴가',
      name: '옥상 바베큐',
      isContent: true,
    },
  });
  const category4 = await database.category.create({
    data: {
      highlight: '루프루팡 픽!',
      name: '최고의 옥상',
      isContent: true,
    },
  });
  const category5 = await database.category.create({
    data: {
      highlight: '옥상에서 즐기는',
      name: '영화 감상',
      isContent: true,
    },
  });

  await Promise.all(
    spaces.map(async (spaces, index) => {
      if (index < 5) {
        await database.category.update({
          where: {
            id: category1.id,
          },
          data: {
            spaceUsageCategories: {
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
      } else if (index < 10) {
        await database.category.update({
          where: {
            id: category2.id,
          },
          data: {
            spaceUsageCategories: {
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
        await database.category.update({
          where: {
            id: category3.id,
          },
          data: {
            spaceUsageCategories: {
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
      } else if (index < 20) {
        await database.category.update({
          where: {
            id: category4.id,
          },
          data: {
            spaceUsageCategories: {
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
        await database.category.update({
          where: {
            id: category5.id,
          },
          data: {
            spaceUsageCategories: {
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
};
