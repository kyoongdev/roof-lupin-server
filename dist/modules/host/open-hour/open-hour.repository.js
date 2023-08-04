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
exports.OpenHourRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const openHour_1 = require("../dto/openHour");
let OpenHourRepository = class OpenHourRepository {
    constructor(database) {
        this.database = database;
    }
    async countOpenHours(args = {}) {
        return await this.database.openHour.count(args);
    }
    async findOpenHours(args = {}) {
        const openHours = await this.database.openHour.findMany(args);
        return openHours.map((openHour) => new openHour_1.OpenHourDTO(openHour));
    }
    async createOpenHour(spaceId, data) {
        const openHour = await this.database.openHour.create({
            data: {
                ...data,
                space: {
                    connect: {
                        id: spaceId,
                    },
                },
            },
        });
        return openHour.id;
    }
    async updateOpenHour(id, data) {
        await this.database.openHour.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteOpenHour(id) {
        await this.database.openHour.delete({
            where: {
                id,
            },
        });
    }
};
OpenHourRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpenHourRepository);
exports.OpenHourRepository = OpenHourRepository;
//# sourceMappingURL=open-hour.repository.js.map