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
exports.AdminExhibitionService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../../database/prisma.service");
const fcm_1 = require("../../../event/fcm");
const exhibition_repository_1 = require("../../exhibition/exhibition.repository");
const file_service_1 = require("../../file/file.service");
let AdminExhibitionService = class AdminExhibitionService {
    constructor(exhibitionRepository, fileService, fcmEvent, database) {
        this.exhibitionRepository = exhibitionRepository;
        this.fileService = fileService;
        this.fcmEvent = fcmEvent;
        this.database = database;
    }
    async findExhibition(id) {
        return await this.exhibitionRepository.findExhibition(id);
    }
    async findPagingExhibitions(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.exhibitionRepository.countExhibitions({
            where: args.where,
        });
        const exhibitions = await this.exhibitionRepository.findExhibitions({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(exhibitions, { paging, count });
    }
    async createExhibition(data) {
        const exhibitionId = await this.exhibitionRepository.createExhibition(data);
        const users = await this.database.user.findMany({
            where: {
                isAlarmAccepted: true,
                pushToken: {
                    not: null,
                },
            },
            select: {
                id: true,
                pushToken: true,
            },
        });
        const targetDate = new Date(data.startAt);
        targetDate.setDate(targetDate.getDate() - 1);
        users
            .map((user) => ({
            pushToken: user.pushToken,
            userId: user.id,
        }))
            .map((user) => {
            this.fcmEvent.createMarketingAlarm({
                ...user,
                title: data.title,
                exhibitionId,
                startAt: data.startAt,
            });
        });
        return exhibitionId;
    }
    async createExhibitionSpace(id, data) {
        await this.findExhibition(id);
        return await this.exhibitionRepository.createExhibitionSpace(id, data);
    }
    async updateExhibition(id, data) {
        await this.findExhibition(id);
        if (data.images) {
            await Promise.all(data.images.map(async (image) => {
                await this.fileService.deleteFile(image);
            }));
        }
        await this.exhibitionRepository.updateExhibition(id, data);
    }
    async updateExhibitionOrder(id, data) {
        await this.findExhibition(id);
        await this.exhibitionRepository.updateExhibitionOrder(id, data);
    }
    async updateExhibitionSpace(id, data) {
        await this.findExhibition(id);
        await this.exhibitionRepository.updateExhibitionSpace(id, data);
    }
    async deleteExhibition(id) {
        await this.findExhibition(id);
        await this.exhibitionRepository.deleteExhibition(id);
    }
    async deleteExhibitionOrder(id) {
        await this.exhibitionRepository.deleteExhibitionOrder(id);
    }
    async deleteExhibitionSpace(id, spaceId) {
        await this.findExhibition(id);
        await this.exhibitionRepository.deleteExhibitionSpace(id, spaceId);
    }
};
AdminExhibitionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exhibition_repository_1.ExhibitionRepository,
        file_service_1.FileService,
        fcm_1.FCMEvent,
        prisma_service_1.PrismaService])
], AdminExhibitionService);
exports.AdminExhibitionService = AdminExhibitionService;
//# sourceMappingURL=exhibition.service.js.map