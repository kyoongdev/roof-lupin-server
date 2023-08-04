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
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const announcement_exception_1 = require("./exception/announcement.exception");
const errorCode_1 = require("./exception/errorCode");
let AnnouncementService = class AnnouncementService {
    constructor(database) {
        this.database = database;
    }
    async findAnnouncement(id) {
        const announcement = await this.database.announcement.findUnique({
            where: { id },
        });
        if (!announcement) {
            throw new announcement_exception_1.AnnouncementException(errorCode_1.ANNOUNCEMENT_ERROR_CODE.NOT_FOUND());
        }
        return new dto_1.AnnouncementDTO(announcement);
    }
    async findPagingAnnouncements(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.countAnnouncements({
            where: args.where,
        });
        const announcements = await this.findAnnouncements({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(announcements, { count, paging });
    }
    async findAnnouncements(args = {}) {
        const announcements = await this.database.announcement.findMany({
            ...args,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
        return announcements.map((announcement) => new dto_1.AnnouncementDTO(announcement));
    }
    async countAnnouncements(args = {}) {
        return this.database.announcement.count(args);
    }
    async createAnnouncement(data) {
        const announcement = await this.database.announcement.create({
            data,
        });
        return announcement.id;
    }
    async updateAnnouncement(id, data) {
        await this.findAnnouncement(id);
        await this.database.announcement.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteAnnouncement(id) {
        await this.findAnnouncement(id);
        await this.database.announcement.delete({
            where: {
                id,
            },
        });
    }
};
AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnouncementService);
exports.AnnouncementService = AnnouncementService;
//# sourceMappingURL=announcement.service.js.map