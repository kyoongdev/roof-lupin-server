import { PrismaClient, Space, User } from '@prisma/client';

import { EncryptProvider } from '@/common/encrypt';

export const seedSpace = async (users: User[], database: PrismaClient): Promise<Space[]> => {
  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();
  const hostPassword = encrypt.hashPassword(salt, 'host1234');

  const realHost = await database.host.create({
    data: {
      password: hostPassword,
      salt,
      email: '9898junjun2@gmail.com',
      name: '박용준',
      phoneNumber: '01040597883',

      hostAccount: {
        create: {
          account: '110161509211',
          accountOwner: '박용준',
          bankCode: '046',
          businessRegistrationNumber: '1234567890',
        },
      },
    },
  });

  const serviceTitles = await database.serviceTitle.findMany({
    where: {
      services: {
        some: {},
      },
    },
    include: {
      services: true,
    },
  });

  const category1 = await database.category.create({
    data: {
      name: `바베큐`,

      isHome: true,
      isRecommended: true,
      icon: {
        create: {
          name: `바베큐`,
          url: 'https://dev-image.rooflupin.com/1690960289881barbeque.svg',
        },
      },
    },
  });

  const category3 = await database.category.create({
    data: {
      name: `글램핑`,
      isHome: true,
      isRecommended: false,
      icon: {
        create: {
          name: `글램핑`,
          url: 'https://dev-image.rooflupin.com/1690960276381glamping.svg',
        },
      },
    },
  });

  const category4 = await database.category.create({
    data: {
      name: `파티룸`,
      isHome: true,
      isRecommended: false,
      icon: {
        create: {
          name: `파티룸`,
          url: 'https://dev-image.rooflupin.com/1690960282465party-room.svg',
        },
      },
    },
  });

  const category5 = await database.category.create({
    data: {
      name: `촬영`,
      isHome: true,
      isRecommended: false,
      icon: {
        create: {
          name: `촬영`,
          url: 'https://dev-image.rooflupin.com/1690960264699film.svg',
        },
      },
    },
  });

  const mainCategories = [category1, category3, category4, category5];
  const baseIcon = await database.icon.create({
    data: {
      url: 'https://roof-lupin.s3.ap-northeast-2.amazonaws.com/dev/Bluetooth.svg',
      name: '블루투스',
    },
  });
  const spaces: any[] = [];
  for (let i = 0; i < 1; i++) {
    const space = await database.space.create({
      include: {
        rentalType: true,
      },
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
        thumbnail: 'https://dev-image.rooflupin.com/IMG_5913.jpg',
        minUser: 5,
        maxUser: 10,
        overflowUserCount: 6,
        overflowUserCost: 15000,
        buildingType: 1,
        minSize: 80,

        isPublic: true,
        isApproved: true,
        isImmediateReservation: true,

        openHours: {
          create: [
            {
              day: 1,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 2,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 3,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 4,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 5,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 6,
              startAt: 10,
              endAt: 26,
            },
            {
              day: 7,
              startAt: 10,
              endAt: 26,
            },
          ],
        },
        holidays: {
          create: [
            {
              day: 2,
              interval: 2,
            },
            {
              day: 3,
              interval: 2,
            },
          ],
        },
        rentalType: {
          create: [
            {
              baseCost: 5000,
              name: '시간당 요금',
              rentalType: 1,
              baseHour: 2,
              startAt: 9,
              endAt: 32,
              day: 1,
              additionalServices: {
                create: {
                  name: '바베큐',
                  cost: 10000,
                },
              },
              timeCostInfos: {
                create: [
                  {
                    cost: 5000,
                    time: 9,
                  },
                  {
                    cost: 5000,
                    time: 10,
                  },
                  {
                    cost: 5000,
                    time: 11,
                  },
                  {
                    cost: 5000,
                    time: 12,
                  },
                  {
                    cost: 5000,
                    time: 13,
                  },
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
                  {
                    cost: 7000,
                    time: 24,
                  },
                  {
                    cost: 7000,
                    time: 25,
                  },
                  {
                    cost: 7000,
                    time: 26,
                  },
                  {
                    cost: 7000,
                    time: 27,
                  },
                  {
                    cost: 7000,
                    time: 28,
                  },
                  {
                    cost: 7000,
                    time: 29,
                  },
                  {
                    cost: 7000,
                    time: 30,
                  },
                  {
                    cost: 7000,
                    time: 31,
                  },
                  {
                    cost: 7000,
                    time: 32,
                  },
                ],
              },
            },
            {
              baseCost: 100000,
              name: '올데이 패키지',
              startAt: 11,
              endAt: 16,
              day: 1,
              rentalType: 2,
              baseHour: 5,
              additionalServices: {
                create: {
                  name: '바베큐',
                  cost: 10000,
                },
              },
            },
            {
              baseCost: 150000,
              name: '올나잇 패키지',
              startAt: 19,
              endAt: 33,
              day: 1,
              rentalType: 2,
              baseHour: 5,
              additionalServices: {
                create: {
                  name: '바베큐',
                  cost: 10000,
                },
              },
            },
            {
              baseCost: 150000,
              name: '올나잇 패키지',
              startAt: 19,
              endAt: 33,
              day: 5,
              rentalType: 2,
              baseHour: 5,
              additionalServices: {
                create: {
                  name: '바베큐',
                  cost: 10000,
                },
              },
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
              floor: 3,
            },
          ],
        },
        images: {
          create: [
            {
              image: {
                create: {
                  url: 'https://dev-image.rooflupin.com/IMG_5916.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://dev-image.rooflupin.com/IMG_5916.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://dev-image.rooflupin.com/IMG_5917.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://dev-image.rooflupin.com/IMG_5918.jpg',
                },
              },
            },
            {
              image: {
                create: {
                  url: 'https://dev-image.rooflupin.com/IMG_5925.jpg',
                },
              },
            },
          ],
        },
        refundPolicies: {
          create: [
            {
              daysBefore: 0,
              refundRate: 10,
            },
            {
              daysBefore: 1,
              refundRate: 20,
            },
            {
              daysBefore: 2,
              refundRate: 30,
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
                  icon: {
                    connect: {
                      id: baseIcon.id,
                    },
                  },
                  name: '주차 0대',
                },
              },
            },
            {
              building: {
                create: {
                  icon: {
                    connect: {
                      id: baseIcon.id,
                    },
                  },
                  name: '3층',
                },
              },
            },
            {
              building: {
                create: {
                  icon: {
                    connect: {
                      id: baseIcon.id,
                    },
                  },
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
                connect: {
                  id: serviceTitles[0].services[0].id,
                },
              },
            },
            {
              service: {
                connect: {
                  id: serviceTitles[1].services[0].id,
                },
              },
            },
            {
              service: {
                connect: {
                  id: serviceTitles[2].services[0].id,
                },
              },
            },
            {
              service: {
                connect: {
                  id: serviceTitles[3].services[0].id,
                },
              },
            },
            {
              service: {
                connect: {
                  id: serviceTitles[4].services[0].id,
                },
              },
            },
            {
              service: {
                connect: {
                  id: serviceTitles[5].services[0].id,
                },
              },
            },
          ],
        },
        hashTags: {
          create: [
            {
              hashTag: {
                create: {
                  name: '건대',
                },
              },
            },
            {
              hashTag: {
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
                  id: mainCategories[i % 4].id,
                },
              },
            },
          ],
        },
      },
    });

    spaces.push(space);
  }

  await Promise.all(
    spaces.map(async (space, spIdx) => {
      const rentalType = space.rentalType.find((type: any) => type.name === '시간당 요금');
      if (rentalType)
        await Promise.all(
          users.map(async (user, index) => {
            await database.spaceQnA.create({
              data: {
                content: '질문이 있는데요.',
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                space: {
                  connect: {
                    id: space.id,
                  },
                },
                ...(index % 2 === 0 && {
                  answers: {
                    create: [
                      {
                        content: '답변입니다.',
                        host: {
                          connect: {
                            id: realHost.id,
                          },
                        },
                      },
                    ],
                  },
                }),
              },
            });
            const reservation = await database.reservation.create({
              data: {
                year: 2023,
                month: 9,
                day: (spIdx % 29) + 1,
                userName: '용준',
                userPhoneNumber: '01012341234',
                originalCost: 10000,
                totalCost: 10000,
                discountCost: 0,
                userCount: 3,
                vatCost: 1000,
                isApproved: true,
                code: `${new Date().getTime()}${index}${spIdx}`,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                rentalTypes: {
                  create: [
                    {
                      startAt: 12,
                      endAt: 32,
                      rentalType: {
                        connect: {
                          id: rentalType.id,
                        },
                      },
                    },
                  ],
                },
              },
            });

            await database.spaceReview.create({
              data: {
                content: '좋아요!!',
                score: 3,
                images: {
                  create: [
                    {
                      image: {
                        create: {
                          url: 'https://dev-image.rooflupin.com/1688717253781IMG_5925.jpeg',
                        },
                      },
                      isBest: true,
                    },
                    {
                      image: {
                        create: {
                          url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
                        },
                      },
                    },
                    {
                      image: {
                        create: {
                          url: 'https://dev-image.rooflupin.com/1688717253784IMG_5926.jpeg',
                        },
                      },
                    },
                  ],
                },
                space: {
                  connect: {
                    id: space.id,
                  },
                },
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                reservation: {
                  connect: {
                    id: reservation.id,
                  },
                },
              },
            });
            await database.userReport.create({
              data: {
                content: '신고합니다',
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                space: {
                  connect: {
                    id: space.id,
                  },
                },
              },
            });
          })
        );
    })
  );

  const space1 = await database.space.create({
    data: {
      title: `루프탑 노을 공원`,
      description:
        '루프탑 노을공원 ( 구 루프탑 공간 휴 )은 멀리 여행을 가서 할수 있는 캠핑을 도심에서 간편하게 즐길수 있는 공간이 있어 숯불 바베큐를 구워먹으며 빔프로젝터를 통해 영화도 볼수 있습니다. 또한 옥상캠핑, 생일파티, 소모임, 이벤트, 촬영 등 다양한 목적으로 이용 가능합니다.',
      thumbnail: 'https://dev-image.rooflupin.com/1688632155577áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg',
      minUser: 1,
      maxUser: 20,
      overflowUserCost: 10000,
      overflowUserCount: 5,
      buildingType: 1,
      minSize: 12,
      isPublic: true,
      isApproved: true,
      sizes: {
        create: [
          {
            size: 12,
            floor: 1,
          },
        ],
      },
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632155578áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg"',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632155578áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg',
              },
            },
          },
        ],
      },
      refundPolicies: {
        create: [
          {
            daysBefore: 0,
            refundRate: 10,
          },
          {
            daysBefore: 1,
            refundRate: 20,
          },
          {
            daysBefore: 2,
            refundRate: 30,
          },
          {
            daysBefore: 3,
            refundRate: 40,
          },
        ],
      },
      cautions: {
        create: [
          {
            content: '조용한 주택가라 시끄럽게 못하는 공간인 점 양해 부탁드립니다.',
          },
          {
            content: '저희 공간은 숙박 시설이 아니므로 숙박 물품은 제공하지 않습니다.',
          },
          {
            content:
              '예약 인원 확인 및 안전 상의 이유로 CCTV는 25시간 녹화되고 있습니다. 기물 파손 시 동일 금액으로 배상하여야 합니다.',
          },
          {
            content: '건물 내 화장실을 사용합니다.',
          },
          {
            content: '방역지침을 준수합니다.',
          },
          {
            content:
              '기존에 준비된 장비 이외에 추가로 숯불이나 화롯불 등의 개인장비 및 화기를 가져와 사용할 수 없습니다.',
          },
        ],
      },
      openHours: {
        create: [
          {
            day: 1,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 2,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 3,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 4,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 5,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 6,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 7,
            startAt: 10,
            endAt: 26,
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
            day: 3,
            baseHour: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
            timeCostInfos: {
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
            baseCost: 1000,
            startAt: 14,
            endAt: 22,
            name: '시간대여2',
            rentalType: 1,
            day: 2,
            baseHour: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
            timeCostInfos: {
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
            endAt: 24,
            name: '패키지 대여',
            rentalType: 2,
            baseHour: 6,
            day: 1,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
          {
            baseCost: 100000,
            startAt: 13,
            endAt: 24,
            name: '패키지 대여2',
            rentalType: 2,
            baseHour: 6,
            day: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
        ],
      },
      location: {
        create: {
          roadAddress: '서울특별시 영등포구 영등포로11길 22 4층 옥상',
          jibunAddress: '서울특별시 영등포구 양평동1가 219-17',
          lng: '126.8883343',
          lat: '37.5244953',
        },
      },
      buildings: {
        create: [
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '주차 5대',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '3층',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
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
              connect: {
                id: serviceTitles[0].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[1].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[2].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[3].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[4].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[5].services[1].id,
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
                id: mainCategories[0].id,
              },
            },
          },
        ],
      },
      publicTransportations: {
        create: [
          {
            name: '양평역',
            timeTaken: 5,
          },
        ],
      },
      host: {
        connect: {
          id: realHost.id,
        },
      },
      holidays: {
        create: [
          {
            day: 4,
            interval: 2,
          },
        ],
      },
    },
  });
  const space2 = await database.space.create({
    data: {
      title: `루프탑709 - 테라스 파티룸`,
      description: `
        ** 당일 온라인 예약 불가
        인천유일의 루프탑 파티룸~
        소중한사람들과 함께하는 우리만의 프라이빗파티 ~

        20여평의 루프탑테라스, 20여평의 프라이빗파티룸 공간 모두 한팀에게만 단독대여

        *낮타임 낮12시~5시

        *저녁타임 저녁7시~아침 9시

        * 오락실게임 900개 게임보드, DVD플레이어, 미라캐스트, 55인치 대형 UHDTV(사진의 빔프로젝트는 화질상의 이유로 TV로 교체),  오디오시설 구비
        `,
      thumbnail: 'https://dev-image.rooflupin.com/1688632809745áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg',
      minUser: 1,
      maxUser: 20,
      overflowUserCost: 10000,
      overflowUserCount: 5,
      buildingType: 1,
      minSize: 12,
      isPublic: true,
      isApproved: true,
      isImmediateReservation: true,
      openHours: {
        create: [
          {
            day: 1,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 2,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 3,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 4,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 5,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 6,
            startAt: 10,
            endAt: 10,
          },
          {
            day: 7,
            startAt: 10,
            endAt: 26,
          },
        ],
      },
      holidays: {
        create: [
          {
            day: 14,
            interval: 4,
          },
        ],
      },
      sizes: {
        create: [
          {
            size: 12,
            floor: 1,
          },
        ],
      },
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632809746áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632809747áá³áá³ááµá«áá£áº 2023-07-06 áá©áá® 5.jpeg',
              },
            },
          },
        ],
      },
      refundPolicies: {
        create: [
          {
            daysBefore: 0,
            refundRate: 10,
          },
          {
            daysBefore: 1,
            refundRate: 20,
          },
          {
            daysBefore: 2,
            refundRate: 30,
          },
          {
            daysBefore: 3,
            refundRate: 40,
          },
        ],
      },
      cautions: {
        create: [
          {
            content: '조용한 주택가라 시끄럽게 못하는 공간인 점 양해 부탁드립니다.',
          },
          {
            content: '저희 공간은 숙박 시설이 아니므로 숙박 물품은 제공하지 않습니다.',
          },
          {
            content:
              '예약 인원 확인 및 안전 상의 이유로 CCTV는 25시간 녹화되고 있습니다. 기물 파손 시 동일 금액으로 배상하여야 합니다.',
          },
          {
            content: '건물 내 화장실을 사용합니다.',
          },
          {
            content: '방역지침을 준수합니다.',
          },
          {
            content:
              '기존에 준비된 장비 이외에 추가로 숯불이나 화롯불 등의 개인장비 및 화기를 가져와 사용할 수 없습니다.',
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
            day: 3,
            baseHour: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
            timeCostInfos: {
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
            endAt: 24,
            name: '패키지 대여',
            rentalType: 2,
            baseHour: 6,
            day: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
          {
            baseCost: 100000,
            startAt: 13,
            endAt: 24,
            name: '패키지 대여2',
            rentalType: 2,
            baseHour: 6,
            day: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
        ],
      },
      location: {
        create: {
          roadAddress: '인천광역시 연수구 먼우금로 96 금송빌딩 6층',
          jibunAddress: '인천광역시 연수구 동춘동 937-6 금송빌딩',
          lng: '126.6704665',
          lat: '37.4075654',
        },
      },
      buildings: {
        create: [
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '주차 5대',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '3층',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
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
              connect: {
                id: serviceTitles[0].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[1].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[2].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[3].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[4].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[5].services[2].id,
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
                id: mainCategories[3].id,
              },
            },
          },
        ],
      },

      host: {
        connect: {
          id: realHost.id,
        },
      },
    },
  });
  const space3 = await database.space.create({
    data: {
      title: `을지로401 바베큐 루프탑 파티룸`,
      description: `
        ** 당일 온라인 예약 불가
        인천유일의 루프탑 파티룸~
        소중한사람들과 함께하는 우리만의 프라이빗파티 ~

        20여평의 루프탑테라스, 20여평의 프라이빗파티룸 공간 모두 한팀에게만 단독대여

        *낮타임 낮12시~5시

        *저녁타임 저녁7시~아침 9시

        * 오락실게임 900개 게임보드, DVD플레이어, 미라캐스트, 55인치 대형 UHDTV(사진의 빔프로젝트는 화질상의 이유로 TV로 교체),  오디오시설 구비
        `,
      thumbnail: 'https://dev-image.rooflupin.com/1688632936057asdf.jpeg',
      minUser: 1,
      maxUser: 20,
      overflowUserCost: 10000,
      overflowUserCount: 5,
      buildingType: 1,
      minSize: 12,
      isPublic: true,
      isApproved: true,
      isImmediateReservation: true,
      openHours: {
        create: [
          {
            day: 1,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 2,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 3,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 4,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 5,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 6,
            startAt: 10,
            endAt: 10,
          },
          {
            day: 7,
            startAt: 10,
            endAt: 26,
          },
        ],
      },
      sizes: {
        create: [
          {
            size: 12,
            floor: 1,
          },
        ],
      },
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632936058basdb.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1688632936059bcbcxcb.jpeg',
              },
            },
          },
        ],
      },
      refundPolicies: {
        create: [
          {
            daysBefore: 0,
            refundRate: 10,
          },
          {
            daysBefore: 1,
            refundRate: 20,
          },
          {
            daysBefore: 2,
            refundRate: 30,
          },
          {
            daysBefore: 3,
            refundRate: 40,
          },
        ],
      },
      cautions: {
        create: [
          {
            content: '조용한 주택가라 시끄럽게 못하는 공간인 점 양해 부탁드립니다.',
          },
          {
            content: '저희 공간은 숙박 시설이 아니므로 숙박 물품은 제공하지 않습니다.',
          },
          {
            content:
              '예약 인원 확인 및 안전 상의 이유로 CCTV는 25시간 녹화되고 있습니다. 기물 파손 시 동일 금액으로 배상하여야 합니다.',
          },
          {
            content: '건물 내 화장실을 사용합니다.',
          },
          {
            content: '방역지침을 준수합니다.',
          },
          {
            content:
              '기존에 준비된 장비 이외에 추가로 숯불이나 화롯불 등의 개인장비 및 화기를 가져와 사용할 수 없습니다.',
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
            day: 3,
            baseHour: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
            timeCostInfos: {
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
            endAt: 24,
            name: '패키지 대여',
            rentalType: 2,
            baseHour: 6,
            day: 3,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
          {
            baseCost: 100000,
            startAt: 13,
            endAt: 24,
            name: '패키지 대여2',
            rentalType: 2,
            baseHour: 6,
            day: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
        ],
      },
      location: {
        create: {
          roadAddress: '서울특별시 중구 충무로 46-1',
          jibunAddress: '서울특별시 중구 초동 17-4',
          lng: '126.9929866',
          lat: '37.5651794',
        },
      },
      buildings: {
        create: [
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '주차 5대',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '3층',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
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
              connect: {
                id: serviceTitles[0].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[1].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[2].services[0].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[3].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[4].services[0].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[5].services[2].id,
              },
            },
          },
        ],
      },
      publicTransportations: {
        create: [{ name: '을지로 3가', timeTaken: 6 }],
      },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: mainCategories[1].id,
              },
            },
          },
        ],
      },

      host: {
        connect: {
          id: realHost.id,
        },
      },
    },
  });

  const space4 = await database.space.create({
    data: {
      title: `루프탑 옥상 아무`,
      description: `
      도시 한복판에서 하늘과 바람과 꽃 사이에서 한가로운 휴식과 피크닉을 즐겨보세요. 
      5호선 양평역, 2호선 문래역 근처에 단 한 팀만을 위한 휴식 공간이 마련되어 있습니다. 
      
      친구, 가족, 연인, 좋아하는 사람들과 옥상 정원에서 행복한 파티를 해보세요!
        `,
      thumbnail: 'https://dev-image.rooflupin.com/1690959585318asdfsda.jpeg',
      minUser: 1,
      maxUser: 6,
      overflowUserCost: 20000,
      overflowUserCount: 3,
      buildingType: 1,
      minSize: 40,
      isPublic: true,
      isApproved: true,
      isImmediateReservation: true,
      openHours: {
        create: [
          {
            day: 1,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 2,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 3,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 4,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 5,
            startAt: 10,
            endAt: 26,
          },
          {
            day: 6,
            startAt: 10,
            endAt: 10,
          },
          {
            day: 7,
            startAt: 10,
            endAt: 26,
          },
        ],
      },
      sizes: {
        create: [
          {
            size: 40,
            floor: 4,
            isRoof: true,
          },
        ],
      },
      images: {
        create: [
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1690959585320bcsdgas.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1690959585320image1.jpeg',
              },
            },
          },
          {
            image: {
              create: {
                url: 'https://dev-image.rooflupin.com/1690959585320image2.jpeg',
              },
            },
          },
        ],
      },
      refundPolicies: {
        create: [
          {
            daysBefore: 0,
            refundRate: 10,
          },
          {
            daysBefore: 1,
            refundRate: 20,
          },
          {
            daysBefore: 2,
            refundRate: 30,
          },
          {
            daysBefore: 3,
            refundRate: 40,
          },
        ],
      },
      cautions: {
        create: [
          {
            content: '조용한 주택가에 위치한 곳이라 시끄럽게 떠들지 못하는 공간인 점 양해 부탁드립니다',
          },
          {
            content: '저희 공간은 숙박시설이 아니므로 숙박 물품은 제공하지 않습니다. (무릎 담요 등 제공)',
          },
          {
            content: '예약은 선입금제로만 가능하며, 예약된 사용 시간 전에 퇴실하여도 잔여 시간은 환불이 불가합니다.',
          },
          {
            content:
              '예약 인원 확인 및 안전상의 이유로 CCTV는 24시간 녹화되고 있습니다. 기물 파손 시 동일 금액으로 배상하여야 합니다.(방에는 CCTV가 없습니다)',
          },
          {
            content: '건물 내 화장실을 사용합니다.',
          },
          {
            content: '공간 사용후에는 정리를 해주셔야 합니다',
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
            day: 3,
            baseHour: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
            timeCostInfos: {
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
            endAt: 24,
            name: '패키지 대여',
            rentalType: 2,
            baseHour: 6,
            day: 3,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
          {
            baseCost: 100000,
            startAt: 13,
            endAt: 24,
            name: '패키지 대여2',
            rentalType: 2,
            baseHour: 6,
            day: 2,
            additionalServices: {
              create: {
                name: '바베큐',
                cost: 10000,
              },
            },
          },
        ],
      },

      location: {
        create: {
          roadAddress: '서울특별시 영등포구 선서유로24길 25-1 4층',
          jibunAddress: '서울특별시 영등포구 선서유로24길 25-1 4층',
          lng: '126.8875',
          lat: '37.5215',
        },
      },

      buildings: {
        create: [
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '주차 5대',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
                name: '4층',
              },
            },
          },
          {
            building: {
              create: {
                icon: {
                  connect: {
                    id: baseIcon.id,
                  },
                },
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
              connect: {
                id: serviceTitles[0].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[1].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[2].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[3].services[2].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[4].services[1].id,
              },
            },
          },
          {
            service: {
              connect: {
                id: serviceTitles[5].services[1].id,
              },
            },
          },
        ],
      },
      publicTransportations: {
        create: [{ name: '양평역', timeTaken: 10 }],
      },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: mainCategories[1].id,
              },
            },
          },
        ],
      },

      host: {
        connect: {
          id: realHost.id,
        },
      },
    },
  });

  return [...spaces, space1, space2, space3].sort(() => Math.random() - 0.5) as Space[];
};
