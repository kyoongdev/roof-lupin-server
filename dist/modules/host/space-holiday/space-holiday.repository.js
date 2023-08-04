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
exports.SpaceHolidayRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const holiday_1 = require("../../space/dto/holiday");
const errorCode_1 = require("../exception/errorCode");
const host_exception_1 = require("../exception/host.exception");
let SpaceHolidayRepository = class SpaceHolidayRepository {
    constructor(database) {
        this.database = database;
    }
    async findSpaceHoliday(id) {
        const holiday = await this.database.spaceHoliday.findUnique({
            where: {
                id,
            },
        });
        if (!holiday) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.NOT_FOUND(errorCode_1.HOST_SPACE_HOLIDAY_NOT_FOUND));
        }
        return new holiday_1.SpaceHolidayDTO(holiday);
    }
    async countSpaceHolidays(args = {}) {
        return await this.database.spaceHoliday.count(args);
    }
    async findSpaceHolidays(args = {}) {
        const holidays = await this.database.spaceHoliday.findMany(args);
        return holidays.map((holiday) => new holiday_1.SpaceHolidayDTO(holiday));
    }
    async findSpaceHolidayBySpaceId(spaceId) {
        const holiday = await this.database.spaceHoliday.findFirst({
            where: {
                spaceId,
            },
        });
        return holiday ? new holiday_1.SpaceHolidayDTO(holiday) : undefined;
    }
    async createSpaceHoliday(spaceId, data) {
        const holiday = await this.database.spaceHoliday.create({
            data: {
                space: {
                    connect: {
                        id: spaceId,
                    },
                },
                ...data,
            },
        });
        return holiday.id;
    }
    async updateSpaceHoliday(id, data) {
        await this.database.spaceHoliday.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteSpaceHoliday(id) {
        await this.database.spaceHoliday.delete({
            where: {
                id,
            },
        });
    }
};
SpaceHolidayRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpaceHolidayRepository);
exports.SpaceHolidayRepository = SpaceHolidayRepository;
//# sourceMappingURL=space-holiday.repository.js.map