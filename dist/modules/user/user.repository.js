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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const user_exception_1 = require("./exception/user.exception");
let UserRepository = class UserRepository {
    constructor(database) {
        this.database = database;
    }
    async findUser(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return new dto_1.CommonUserDTO(user);
    }
    async findUserPushToken(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
            select: {
                pushToken: true,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return new dto_1.PushTokenDTO({ pushToken: user.pushToken });
    }
    async findUserByEmail(email) {
        const user = await this.database.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return new dto_1.CommonUserDTO(user);
    }
    async findUserByNickname(nickname) {
        const user = await this.database.user.findFirst({
            where: {
                nickname,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return new dto_1.CommonUserDTO(user);
    }
    async findUserBySocialId(socialId) {
        const socialUser = await this.database.userSocial.findUnique({
            where: {
                socialId,
            },
            include: {
                user: true,
            },
        });
        if (!socialUser) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND(errorCode_1.SOCIAL_USER_NOT_FOUND));
        }
        return socialUser.user;
    }
    async checkUserIsBlocked(id) {
        const user = await this.database.user.findUnique({
            where: {
                id,
            },
            select: {
                isBlocked: true,
                unBlockAt: true,
            },
        });
        if (!user) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.NOT_FOUND());
        }
        return user;
    }
    async checkUserBySocialId(socialId) {
        const socialUser = await this.database.userSocial.findUnique({
            where: {
                socialId,
            },
            include: {
                user: true,
            },
        });
        if (!socialUser) {
            return undefined;
        }
        return new dto_1.CommonUserDTO(socialUser.user);
    }
    async checkUserByPhoneNumber(phoneNumber) {
        const user = await this.database.user.findFirst({
            where: {
                phoneNumber,
            },
        });
        return user;
    }
    async createSocialUser(props) {
        const { socialId, socialType, ...rest } = props;
        const isExist = await this.checkUserBySocialId(socialId);
        if (isExist) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.CONFLICT(errorCode_1.USER_ALREADY_EXIST));
        }
        const newUser = await this.database.user.create({
            data: {
                ...rest,
                socials: {
                    create: {
                        socialId,
                        socialType,
                    },
                },
            },
        });
        return newUser.id;
    }
    async updateUser(id, data) {
        await this.findUser(id);
        await this.database.user.update({
            where: {
                id,
            },
            data,
        });
    }
    async login(id) {
        await this.database.user.update({
            where: {
                id,
            },
            data: {
                loginedAt: new Date(),
            },
        });
    }
    async deleteUser(id) {
        await this.findUser(id);
        await this.database.user.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map