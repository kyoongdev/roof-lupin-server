"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const lodash_1 = require("lodash");
const encrypt_1 = require("../common/encrypt");
const constants_1 = require("../modules/coupon/constants");
const validation_1 = require("../modules/coupon/validation");
const holiday_1 = require("./holiday");
const home_1 = require("./home");
const host_1 = require("./host");
const space_1 = require("./space");
const seedDatabase = async (database) => {
    await database.space.deleteMany({});
    await database.host.deleteMany({});
    await database.user.deleteMany({});
    await database.admin.deleteMany({});
    await database.slogan.deleteMany({});
    await database.mainImage.deleteMany({});
    await database.location.deleteMany({});
    await database.category.deleteMany({});
    await database.coupon.deleteMany({});
    await database.homeContents.deleteMany({});
    await database.curation.deleteMany({});
    await database.ranking.deleteMany({});
    await database.fAQ.deleteMany({});
    await database.spaceHoliday.deleteMany({});
    await (0, host_1.seedHosts)(database);
    await (0, holiday_1.seedHoliday)(database);
    const encrypt = new encrypt_1.EncryptProvider();
    const salt = encrypt.createSalt();
    const adminPassword = encrypt.hashPassword(salt, 'admin1234');
    const users = [];
    await Promise.all((0, lodash_1.range)(1, 50).map(async (i) => {
        const user = await database.user.create({
            data: {
                nickname: `user${i}`,
                name: `테스트유저${i}`,
                gender: i % 2 === 0 ? 1 : 2,
                email: `testUser${i}@gmail.com`,
            },
        });
        await database.fAQ.create({
            data: {
                question: `테스트유저${i}의 질문`,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        if (i < 20) {
            await database.frequentQuestion.create({
                data: {
                    question: `자주 묻는 질문 ${i}`,
                    answer: `자주 묻는 질문 ${i}의 답변`,
                },
            });
        }
        users.push(user);
    }));
    await database.coupon.create({
        data: {
            name: '회원가입',
            code: constants_1.COUPON_CODE.REGISTER,
            description: '회원가입시 발급되는 쿠폰입니다.',
            discountType: validation_1.DISCOUNT_TYPE_ENUM.PERCENTAGE,
            discountValue: 10,
            isLupinPay: true,
            defaultDueDay: 14,
        },
    });
    await database.coupon.create({
        data: {
            name: '생일',
            code: constants_1.COUPON_CODE.BIRTHDAY,
            description: '생일에 발급되는 쿠폰입니다.',
            discountType: validation_1.DISCOUNT_TYPE_ENUM.PERCENTAGE,
            discountValue: 10,
            isLupinPay: true,
            defaultDueDay: 7,
        },
    });
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
    await database.user.create({
        data: {
            nickname: 'testUser2',
            name: '테스트유저',
            gender: 1,
        },
    });
    const spaces = await (0, space_1.seedSpace)(users, database);
    await (0, home_1.seedHome)(database, spaces);
    for (let i = 0; i < 1; i++) {
        await database.curation.create({
            data: {
                title: `이달의 공간`,
                subTitle: `더운 여름 속 루프라이프`,
                content: `더운 여름 속, 루프라이프를 즐기세요!`,
                thumbnail: 'https://dev-image.rooflupin.com/1688714930777rooftop-cafe.jpeg',
                isMain: true,
                user: {
                    connect: {
                        id: testUser.id,
                    },
                },
                spaces: {
                    create: [
                        {
                            space: {
                                connect: {
                                    id: spaces[0].id,
                                },
                            },
                            orderNo: i,
                        },
                    ],
                },
            },
        });
    }
};
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=index.js.map