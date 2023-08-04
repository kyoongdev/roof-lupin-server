"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHome = void 0;
const seedHome = async (database, spaces) => {
    const category1 = await database.contentCategory.create({
        data: {
            highlight: '8월 인기',
            name: '기획전',
        },
    });
    const exhibition = await database.exhibition.create({
        data: {
            title: '특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!',
            description: '특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!',
            content: `
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
      특별한 VIEW - 특별한 경치를 자랑하는 옥상 공간 모음!
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
    await Promise.all(spaces.map(async (spaces, index) => {
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
    }));
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
};
exports.seedHome = seedHome;
//# sourceMappingURL=home.js.map