"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const errorCode_1 = require("../../user/exception/errorCode");
const user_exception_1 = require("../../user/exception/user.exception");
const utils_1 = require("../../user/utils");
const user_1 = require("../dto/user");
let AdminUserRepository = class AdminUserRepository {
    constructor(database) {
        this.database = database;
    }
    async findUsers(args = {}) {
        const users = await this.database.user.findMany({
            ...args,
            include: {
                socials: true,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
        return users.map((user) => new user_1.AdminUserDTO({
            ...user,
            socialType: user.socials.length > 0 ? (0, utils_1.numberToSocialType)(user.socials[0].socialType) : null,
        }));
    }
    async countUsers(args = {}) {
        return await this.database.user.count(args);
    }
    async findUser(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
            include: {
                socials: true,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return new user_1.AdminUserDTO({
            ...user,
            socialType: user.socials.length > 0 ? (0, utils_1.numberToSocialType)(user.socials[0].socialType) : null,
        });
    }
    async updateUser(id, data) {
        await this.database.user.update({
            where: {
                id,
            },
            data: {
                ...data,
                blockedAt: data.isBlocked ? new Date() : null,
            },
        });
    }
    async hardDeleteUser(id) {
        const user = await this.findUser(id);
        if (!user.deletedAt) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.FORBIDDEN(errorCode_1.HARD_DELETE_FAILED));
        }
        await this.database.user.delete({
            where: {
                id,
            },
        });
    }
    async deleteUser(id) {
        await this.database.user.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async restoreUser(id) {
        await this.database.user.update({
            where: {
                id,
            },
            data: {
                deletedAt: null,
            },
        });
    }
};
AdminUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUserRepository);
exports.AdminUserRepository = AdminUserRepository;
//# sourceMappingURL=user.repository.js.map