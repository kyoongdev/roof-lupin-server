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
exports.BlockedTimeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const blocked_time_1 = require("../dto/blocked-time");
const blocked_time_2 = require("./exception/blocked-time");
const errorCode_1 = require("./exception/errorCode");
let BlockedTimeRepository = class BlockedTimeRepository {
    constructor(database) {
        this.database = database;
    }
    async findBlockedTime(id) {
        const blockedTime = await this.database.blockedTime.findUnique({
            where: {
                id,
            },
        });
        if (!blockedTime) {
            throw new blocked_time_2.BlockedTimeException(errorCode_1.BLOCKED_TIME_ERROR_CODE.NOT_FOUND(errorCode_1.BLOCKED_TIME_NOT_FOUND));
        }
        return new blocked_time_1.BlockedTimeDTO(blockedTime);
    }
    async countBlockedTimes(args = {}) {
        return await this.database.blockedTime.count({
            where: args.where,
        });
    }
    async findBlockedTimes(args = {}) {
        const blockedTimes = await this.database.blockedTime.findMany(args);
        return blockedTimes.map((blockedTime) => new blocked_time_1.BlockedTimeDTO(blockedTime));
    }
    async createBlockedTime(data) {
        const blockedTime = await this.database.blockedTime.create({
            data,
        });
        return blockedTime;
    }
    async updateBlockedTime(id, data) {
        await this.database.blockedTime.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteBlockedTime(id) {
        await this.database.blockedTime.delete({
            where: {
                id,
            },
        });
    }
};
BlockedTimeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockedTimeRepository);
exports.BlockedTimeRepository = BlockedTimeRepository;
//# sourceMappingURL=blocked-time.repository.js.map