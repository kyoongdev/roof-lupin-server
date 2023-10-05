import { PrismaClient } from '@prisma/client';

export const seedFilter = async (database: PrismaClient) => {
  await database.locationFilterGroup.create({
    data: {
      name: '서울',
      locationFilters: {
        create: [
          {
            topics: {
              create: [
                {
                  name: '강동구',
                },
                {
                  name: '광진구',
                },
                {
                  name: '송파구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '성동구',
                },
                {
                  name: '강남구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '중구',
                },
                {
                  name: '용산구',
                },
                {
                  name: '영등포구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '서초구',
                },
                {
                  name: '관악구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '구로구',
                },
                {
                  name: '금천구',
                },
                {
                  name: '동작구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '강서구',
                },
                {
                  name: '양천구',
                },
                {
                  name: '마포구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '은평구',
                },
                {
                  name: '서대문구',
                },
                {
                  name: '종로구',
                },
                {
                  name: '성북구',
                },
              ],
            },
          },
          {
            topics: {
              create: [
                {
                  name: '동대문구',
                },
                {
                  name: '중랑구',
                },
                {
                  name: '노원구',
                },
                {
                  name: '도봉구',
                },
                {
                  name: '강북구',
                },
              ],
            },
          },
        ],
      },
    },
  });
};
