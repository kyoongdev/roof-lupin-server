import { Category, Prisma, Space } from '@prisma/client';
import axios from 'axios';
import { range } from 'lodash';

import { PrismaService } from '@/database/prisma.service';

import { EncryptProvider } from '../common/encrypt';
import { OpenAPI } from '../interface/holiday.interface';
import { COUPON_CODE } from '../modules/coupon/constants';
import { DISCOUNT_TYPE_ENUM } from '../modules/coupon/validation';

import { seedHosts } from './host';
import { seedSpace } from './space';

export const seedDatabase = async (database: PrismaService) => {
  await database.space.deleteMany({});
  await database.host.deleteMany({});
  await database.user.deleteMany({});
  await database.admin.deleteMany({});
  await database.slogan.deleteMany({});
  await database.mainImage.deleteMany({});
  await database.location.deleteMany({});
  await database.category.deleteMany({});
  await database.holiday.deleteMany({});
  await database.coupon.deleteMany({});
  await seedHosts(database);
  await seedSpace(database);
  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');
  await database.coupon.create({
    data: {
      name: '회원가입',
      code: COUPON_CODE.REGISTER,
      description: '회원가입시 발급되는 쿠폰입니다.',
      discountType: DISCOUNT_TYPE_ENUM.PERCENTAGE,
      discountValue: 10,
      isLupinPay: true,
      defaultDueDay: 14,
    },
  });
  await database.coupon.create({
    data: {
      name: '생일',
      code: COUPON_CODE.BIRTHDAY,
      description: '생일에 발급되는 쿠폰입니다.',
      discountType: DISCOUNT_TYPE_ENUM.PERCENTAGE,
      discountValue: 10,
      isLupinPay: true,
      defaultDueDay: 7,
    },
  });
  await Promise.all(
    range(2023, 2031).map(async (i) => {
      await Promise.all(
        range(1, 13).map(async (j) => {
          const month = `${j}`.length === 1 ? `0${j}` : `${j}`;

          const response = await axios.get<OpenAPI>(
            `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${i}&solMonth=${month}&ServiceKey=${process.env.OPEN_API_KEY}`
          );

          const items = response.data.response?.body.items.item;

          if (items) {
            if (Array.isArray(items)) {
              await Promise.all(
                items.map(async (item) => {
                  const day = `${Number(`${item.locdate}`.slice(6))}`;
                  const isExist = await database.holiday.findFirst({
                    where: {
                      year: `${i}`,
                      month: `${j}`,
                      day,
                    },
                  });
                  if (!isExist)
                    await database.holiday.create({
                      data: {
                        year: `${i}`,
                        month: `${j}`,
                        day,
                        name: item.dateName,
                      },
                    });
                })
              );
            } else {
              const day = `${Number(`${items.locdate}`.slice(6))}`;
              const isExist = await database.holiday.findFirst({
                where: {
                  year: `${i}`,
                  month: `${j}`,
                  day,
                },
              });
              if (!isExist)
                await database.holiday.create({
                  data: {
                    year: `${i}`,
                    month: `${j}`,
                    day,
                    name: items.dateName,
                  },
                });
            }
          }
        })
      );
    })
  );

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
  }
  const hostPassword2 = encrypt.hashPassword(salt, 'real1234');

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
                vatCost: 2000 - taxCost,
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
                vatCost: 2000 - taxCost,
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
                vatCost: 2000 - taxCost,
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
                vatCost: 2000 - taxCost,
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
                vatCost: 2000 - taxCost,
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
                vatCost: 2000 - taxCost,
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
