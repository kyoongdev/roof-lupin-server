import { PrismaClient } from '@prisma/client';

export const seedService = async (database: PrismaClient) => {
  const iconPath = 'https://dev-image.rooflupin.com/1691221976548bluetooth.svg';
  await database.serviceTitle.create({
    data: {
      name: '편의시설',
      services: {
        create: [
          {
            name: '주류반입가능',
            iconPath,
          },
          {
            name: '음식물반입가능',
            iconPath,
          },
          {
            name: '반려동물동반가능',
            iconPath,
          },
          {
            name: '금연',
            iconPath,
          },
          {
            name: '흡연가능',
            iconPath,
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
            iconPath,
          },
          {
            name: '촬영용 카메라',
            iconPath,
          },
          {
            name: '촬영용 조명',
            iconPath,
          },
          {
            name: '촬영 소품',
            iconPath,
          },
          {
            name: '삼각대',
            iconPath,
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
            iconPath,
          },
          {
            name: '음향/마이크',
            iconPath,
          },
          {
            name: '블루투스 스피커',
            iconPath,
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
            iconPath,
          },
          {
            name: '취사시설',
            iconPath,
          },
          {
            name: '공용주방',
            iconPath,
          },
          {
            name: '정수기',
            iconPath,
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
            iconPath,
          },
          {
            name: '주차장',
            iconPath,
          },
          {
            name: '엘리베이터',
            iconPath,
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
            iconPath,
          },
          {
            name: '인터넷/WIFI',
            iconPath,
          },
          {
            name: '벌레퇴치제',
            iconPath,
          },
          {
            name: 'TV/프로젝터',
            iconPath,
          },
          {
            name: '내부 화장실',
            iconPath,
          },
          {
            name: '샤워시설',
            iconPath,
          },
          {
            name: '탈의실',
            iconPath,
          },
          {
            name: '화장대',
            iconPath,
          },
          {
            name: '파티용 소품',
            iconPath,
          },
          {
            name: '야외조명',
            iconPath,
          },
          {
            name: '의자/테이블',
            iconPath,
          },
          {
            name: '텐트',
            iconPath,
          },
          {
            name: '파라솔',
            iconPath,
          },
          {
            name: '공용라운지',
            iconPath,
          },
        ],
      },
    },
  });
};
