import { PrismaClient } from '@prisma/client';

export const seedService = async (database: PrismaClient) => {
  const iconPath = 'https://dev-image.rooflupin.com/1691221976548bluetooth.svg';
  const selectedIconPath = 'https://dev-image.rooflupin.com/bar_selected.svg';
  const baseIcon = await database.icon.create({
    data: {
      url: iconPath,
      name: '기본 아이콘',
    },
  });
  const selectedIcon = await database.icon.create({
    data: {
      url: selectedIconPath,
      name: '선택된 아이콘',
    },
  });
  const icons = {
    create: [
      {
        icon: {
          connect: {
            id: baseIcon.id,
          },
        },
        isSelected: false,
      },
      {
        icon: {
          connect: {
            id: selectedIcon.id,
          },
        },
        isSelected: true,
      },
    ],
  };
  await database.serviceTitle.create({
    data: {
      name: '편의시설',
      services: {
        create: [
          {
            name: '주류반입가능',
            icons,
          },
          {
            name: '음식물반입가능',
            icons,
          },
          {
            name: '반려동물동반가능',
            icons,
          },
          {
            name: '금연',
            icons,
          },
          {
            name: '흡연가능',
            icons,
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
            icons,
          },
          {
            name: '촬영용 카메라',
            icons,
          },
          {
            name: '촬영용 조명',
            icons,
          },
          {
            name: '촬영 소품',
            icons,
          },
          {
            name: '삼각대',
            icons,
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
            icons,
          },
          {
            name: '음향/마이크',
            icons,
          },
          {
            name: '블루투스 스피커',
            icons,
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
            icons,
          },
          {
            name: '취사시설',
            icons,
          },
          {
            name: '공용주방',
            icons,
          },
          {
            name: '정수기',
            icons,
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
            icons,
          },
          {
            name: '주차장',
            icons,
          },
          {
            name: '엘리베이터',
            icons,
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
            icons,
          },
          {
            name: '인터넷/WIFI',
            icons,
          },
          {
            name: '벌레퇴치제',
            icons,
          },
          {
            name: 'TV/프로젝터',
            icons,
          },
          {
            name: '내부 화장실',
            icons,
          },
          {
            name: '샤워시설',
            icons,
          },
          {
            name: '탈의실',
            icons,
          },
          {
            name: '화장대',
            icons,
          },
          {
            name: '파티용 소품',
            icons,
          },
          {
            name: '야외조명',
            icons,
          },
          {
            name: '의자/테이블',
            icons,
          },
          {
            name: '텐트',
            icons,
          },
          {
            name: '파라솔',
            icons,
          },
          {
            name: '공용라운지',
            icons,
          },
        ],
      },
    },
  });
};
