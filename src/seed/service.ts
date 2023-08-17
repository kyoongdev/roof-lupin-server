import { PrismaClient } from '@prisma/client';

export const seedService = async (database: PrismaClient) => {
  const iconPath = 'https://dev-image.rooflupin.com/1691221976548bluetooth.svg';
  const baseIcon = await database.icon.create({
    data: {
      url: iconPath,
      name: '기본 아이콘',
    },
  });
  await database.serviceTitle.create({
    data: {
      name: '편의시설',
      services: {
        create: [
          {
            name: '주류반입가능',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '음식물반입가능',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '반려동물동반가능',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '금연',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '흡연가능',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });
  await database.serviceTitle.create({
    data: {
      name: '촬영',
      services: {
        create: [
          {
            name: '포토존',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '촬영용 카메라',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '촬영용 조명',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '촬영 소품',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '삼각대',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });

  await database.serviceTitle.create({
    data: {
      name: '음향',
      services: {
        create: [
          {
            name: '노래방 기기',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '음향/마이크',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '블루투스 스피커',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });
  await database.serviceTitle.create({
    data: {
      name: '취사',
      services: {
        create: [
          {
            name: '바베큐시설',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '취사시설',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '공용주방',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '정수기',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });

  await database.serviceTitle.create({
    data: {
      name: '외부시설',
      services: {
        create: [
          {
            name: '근처 마트/편의점',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '주차장',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '엘리베이터',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });

  await database.serviceTitle.create({
    data: {
      name: '기타 시설',
      services: {
        create: [
          {
            name: '전기 사용 가능',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '인터넷/WIFI',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '벌레퇴치제',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: 'TV/프로젝터',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '내부 화장실',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '샤워시설',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '탈의실',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '화장대',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '파티용 소품',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '야외조명',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '의자/테이블',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '텐트',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '파라솔',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
          {
            name: '공용라운지',
            icon: {
              connect: {
                id: baseIcon.id,
              },
            },
          },
        ],
      },
    },
  });
};
