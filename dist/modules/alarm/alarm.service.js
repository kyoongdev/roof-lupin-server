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
exports.AlarmService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const alarm_repository_1 = require("./alarm.repository");
const alarm_exception_1 = require("./exception/alarm.exception");
const errorCode_1 = require("./exception/errorCode");
let AlarmService = class AlarmService {
    constructor(alarmRepository) {
        this.alarmRepository = alarmRepository;
    }
    async findAlarm(id) {
        return await this.alarmRepository.findAlarm(id);
    }
    async findPagingAlarms(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.alarmRepository.countAlarms({
            where: args.where,
        });
        const alarms = await this.alarmRepository.findAlarms({
            where: args.where,
            orderBy: [
                {
                    isRead: 'asc',
                },
                {
                    createdAt: 'desc',
                },
            ],
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(alarms, { count, paging });
    }
    async readAlarm(id, userId) {
        const alarm = await this.findAlarm(id);
        if (alarm.user.id !== userId) {
            throw new alarm_exception_1.AlarmException(errorCode_1.ALARM_ERROR_CODE.NOT_FOUND(errorCode_1.ALARM_MUTATION_FORBIDDEN));
        }
        await this.alarmRepository.updateAlarm(id, { isRead: true });
    }
    async deleteAlarm(id, userId) {
        const alarm = await this.findAlarm(id);
        if (alarm.user.id !== userId) {
            throw new alarm_exception_1.AlarmException(errorCode_1.ALARM_ERROR_CODE.NOT_FOUND(errorCode_1.ALARM_MUTATION_FORBIDDEN));
        }
        await this.alarmRepository.deleteAlarm(id);
    }
};
AlarmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alarm_repository_1.AlarmRepository])
], AlarmService);
exports.AlarmService = AlarmService;
//# sourceMappingURL=alarm.service.js.map