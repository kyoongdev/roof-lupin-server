"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHosts = void 0;
const lodash_1 = require("lodash");
const encrypt_1 = require("../common/encrypt");
const seedHosts = async (database) => {
    const encrypt = new encrypt_1.EncryptProvider();
    const salt = encrypt.createSalt();
    const hostPassword = encrypt.hashPassword(salt, 'host1234');
    await Promise.all((0, lodash_1.range)(1, 20).map(async (idx) => {
        await database.host.create({
            data: {
                name: `호스트 ${idx}`,
                email: `host${idx}@gmail.com`,
                gender: 1,
                phoneNumber: `01012341234`,
                password: hostPassword,
                salt,
            },
        });
    }));
};
exports.seedHosts = seedHosts;
//# sourceMappingURL=host.js.map