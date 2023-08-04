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
exports.AlarmRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const alarm_exception_1 = require("./exception/alarm.exception");
const errorCode_1 = require("./exception/errorCode");
let AlarmRepository = class AlarmRepository {
    constructor(database) {
        this.database = database;
    }
    async findAlarm(id) {
        const alarm = await this.database.userAlarm.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        if (!alarm) {
            throw new alarm_exception_1.AlarmException(errorCode_1.ALARM_ERROR_CODE.NOT_FOUND(errorCode_1.ALARM_NOT_FOUND));
        }
        return new dto_1.AlarmDTO(alarm);
    }
    async countAlarms(args = {}) {
        return await this.database.userAlarm.count(args);
    }
    async findAlarms(args = {}) {
        const alarms = await this.database.userAlarm.findMany({
            ...args,
            include: {
                user: true,
            },
        });
        return alarms.map((alarm) => new dto_1.AlarmDTO(alarm));
    }
    async createAlarm(data) {
        const { spaceId, exhibitionId, userId, ...rest } = data;
        const alarm = await this.database.userAlarm.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                ...(spaceId && {
                    alarmSpace: {
                        create: {
                            space: {
                                connect: {
                                    id: spaceId,
                                },
                            },
                        },
                    },
                }),
                ...(exhibitionId && {
                    alarmExhibition: {
                        create: {
                            exhibition: {
                                connect: {
                                    id: exhibitionId,
                                },
                            },
                        },
                    },
                }),
            },
            include: {
                user: true,
            },
        });
        return alarm.id;
    }
    async updateAlarm(id, data) {
        await this.database.userAlarm.update({
            where: {
                id,
            },
            data,
            include: {
                user: true,
            },
        });
    }
    async deleteAlarm(id) {
        await this.database.userAlarm.delete({
            where: {
                id,
            },
        });
    }
};
AlarmRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlarmRepository);
exports.AlarmRepository = AlarmRepository;
//# sourceMappingURL=alarm.repository.js.map