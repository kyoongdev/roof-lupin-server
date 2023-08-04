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
exports.HolidayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
let HolidayService = class HolidayService {
    constructor(database) {
        this.database = database;
    }
    async findHoliday(year, month) {
        const holidays = await this.database.holiday.findMany({
            where: {
                year: year,
                month: month,
            },
        });
        return holidays.map((holiday) => new dto_1.HolidayDTO(holiday));
    }
    async checkIsHoliday(year, month, day) {
        const holiday = await this.database.holiday.findFirst({
            where: {
                year: year,
                month: month,
                day: day,
            },
        });
        return !!holiday;
    }
};
HolidayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HolidayService);
exports.HolidayService = HolidayService;
//# sourceMappingURL=holiday.service.js.map