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
  const hostPassword2 = Encrypt.hashPassword(salt, 'real1234');
  const realHost = await database.host.create({
    data: {
      password: hostPassword2,
      salt,
      email: '9898junjun2@gmail.com',
      gender: 1,
      name: '박용준',
      phoneNumber: '01040597883',
      hostAccount: {
        create: {
          ownerName: '박용준',
          account: '110161509211',
          accountOwner: '박용준',
          bankName: 12,
          businessRegistrationNumber: '1234567890',
        },
      },
    },
  });

  const partyRoomCategory = await database.category.create({
    data: {
      name: '파티룸',
    },
  });

  const barbequeCategory = await database.category.create({
    data: {
      name: '바베큐',
    },
  });

  await database.space.create({
    data: {
      title: '디난트 파티룸',
      description: `특별한날 우리만의 공간에서 파티를 즐길수 있는 디난트파티룸!
      건대후문 바로 앞 어린이대공원역 도보 3분컷!
      
      다양한 컨셉으로 포토존 가득한 파티룸
      넓은 공간에서 단체 또는 연인 친구들과 즐거운 시간을 보낼 수 있는 프라이빗한 공간을 대여해 보세요
      
      친구들과 생일파티
      결혼 전 브라이덜샤워
      연인의 프로포즈
      단체로 단합할수 있는 파티
      촬영용 공간대여
      일일 공간대여로 안성맞춤
      
      우리들만의 프라이빗 루프탑에서 즐기는 바베큐파티
      80인치 대형 티비로 영화감상
      블링블링 파티컨셉에 맞춰 사진촬영
      큐티한 바비박스에서 바비로 변신!
      숯불바베큐가 가능하며
      불은 호스트가 직접피어 드립니다
      넓은공간/ 프라이빗루프탑/ 실내화장실 /대형티비 완비`,
      thumbnail: 'https://dev-image.cumuco.net/IMG_5913.jpg',
      minUser: 0,
      maxUser: 0,
      overflowUserCount: 6,
      overflowUserCost: 15000,
      buildingType: 1,
      minSize: 80,
      rentalType: {
        create: [
          {
            baseCost: 5000,
            name: '시간당 요금',
            rentalType: 1,
            baseHour: 2,
            startAt: 14,
            endAt: 24,
            timeCostInfo: {
              create: [
                {
                  cost: 5000,
                  time: 14,
                },
                {
                  cost: 5000,
                  time: 15,
                },
                {
                  cost: 5000,
                  time: 16,
                },
                {
                  cost: 7000,
                  time: 17,
                },
                {
                  cost: 7000,
                  time: 18,
                },
                {
                  cost: 7000,
                  time: 19,
                },
                {
                  cost: 7000,
                  time: 20,
                },
                {
                  cost: 7000,
                  time: 21,
                },
                {
                  cost: 7000,
                  time: 22,
                },
                {
                  cost: 7000,
                  time: 23,
                },
              ],
            },
          },
          {
            baseCost: 100000,
            name: '올데이 패키지',
            startAt: 11,
            endAt: 16,
            rentalType: 2,
            baseHour: 5,
          },
          {
            baseCost: 150000,
            name: '올나잇 패키지',
            startAt: 19,
            endAt: 9,
            rentalType: 2,
            baseHour: 5,
          },
        ],
      },

      host: {
        connect: {
          id: realHost.id,
        },
      },
      sizes: {
        create: [
          {
            size: 80,
            floor: '3층',
          },
        ],
      },
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.cumuco.net/IMG_5916.jpg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.cumuco.net/IMG_5916.jpg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.cumuco.net/IMG_5917.jpg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.cumuco.net/IMG_5918.jpg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.cumuco.net/IMG_5925.jpg',
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
            content:
              '이용 후 쓰레기분리수거, 설거지, 음식물쓰레기정리, 사용한 물품 제자리로 정리정돈 후 퇴실 해 주세요 (미처리시 보증금 반환불가)',
          },
          {
            content: '실내 모든 집기등은 편안하게 쓰시고 제자리에 정리 해 주세요',
          },
          {
            content: `☆☆취사금지/ 불사용금지☆☆
            화재발생 시 모든 책임 및 보상 해 주셔야 합니다`,
          },
          {
            content: `루프탑 이용시 계단이 가파르니 손잡이를 잡고오르락 내리락 해 주세요 본인 부주의로 인한 사고에 대해서 디난트파티룸은 전혀 책임 지지 않습니다
            ☆☆낙상주의☆☆`,
          },
        ],
      },
      location: {
        create: {
          roadAddress: '서울특별시 광진구 광나루로24길 23 (화양동), 3층',
          jibunAddress: '	서울특별시 광진구 화양동 495-27, 3층',
          lng: '127.07668323717',
          lat: '37.545277604771',
        },
      },
      buildings: {
        create: [
          {
            building: {
              create: {
                iconPath: 'https://www.svgrepo.com/show/460432/battery-10-line.svg',
                name: '주차 0대',
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
                name: '건대',
              },
            },
          },
          {
            hashtag: {
              create: {
                name: '파티룸',
              },
            },
          },
        ],
      },
      publicTransportations: {
        create: [
          {
            name: '어린이대공원역',
            timeTaken: 10,
          },
        ],
      },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: partyRoomCategory.id,
              },
            },
          },
          {
            category: {
              connect: {
                id: barbequeCategory.id,
              },
            },
          },
        ],
      },
    },
  });

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
        categories: {
          create: [
            {
              category: {
                connect: {
                  id: barbequeCategory.id,
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
        host: {
          connect: {
            id: host.id,
          },
        },
      },
    });
    await database.blockedTime.create({
      data: {
        year: '2023',
        month: '6',
        day: '20',
        startAt: 14,
        endAt: 15,
        space: {
          connect: {
            id: space.id,
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
      const rentalTypes = await database.rentalType.findMany({
        where: {
          spaceId: spaces.id,
        },
      });
      await Promise.all(
        rentalTypes.map(async (rentalType) => {
          if (rentalType.rentalType === 1) {
            const taxCost = Math.floor(2000 / 1.1);
            const reservation = await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '10',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 14,
                endAt: 15,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },
                      isBest: true,
                      images: {
                        create: [
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                        ],
                      },
                      user: {
                        connect: {
                          id: testUser.id,
                        },
                      },
                      answers: {
                        create: [
                          {
                            content: '테스트 답변',
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
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '8',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '15',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰2',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },

                      user: {
                        connect: {
                          id: testUser.id,
                        },
                      },
                    },
                  ],
                },
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '14',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰2',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },
                      images: {
                        create: [
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                        ],
                      },
                      user: {
                        connect: {
                          id: testUser.id,
                        },
                      },
                    },
                  ],
                },
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '13',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰2',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },
                      images: {
                        create: [
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                        ],
                      },
                      user: {
                        connect: {
                          id: testUser.id,
                        },
                      },
                    },
                  ],
                },
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '12',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰2',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },
                      images: {
                        create: [
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                        ],
                      },
                      user: {
                        connect: {
                          id: testUser.id,
                        },
                      },
                    },
                  ],
                },
              },
            });
            await database.reservation.create({
              data: {
                year: '2023',
                month: '6',
                day: '11',
                rentalType: {
                  connect: {
                    id: rentalType.id,
                  },
                },
                startAt: 17,
                endAt: 18,
                originalCost: 2000,
                taxFreeCost: 2000 - taxCost,
                totalCost: 2000,
                userCount: 3,
                user: {
                  connect: {
                    id: testUser.id,
                  },
                },
                spaceReviews: {
                  create: [
                    {
                      content: '테스트 리뷰2',
                      score: 4,
                      space: {
                        connect: {
                          id: spaces.id,
                        },
                      },
                      images: {
                        create: [
                          {
                            image: {
                              create: {
                                url: `https://kyoongdev-blog.sgp1.vultrobjects.com/images/rooftop-cafe.jpeg`,
                              },
                            },
                          },
                        ],
                      },
                      user: {
                        connect: {
                          id: testUser.id,
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
