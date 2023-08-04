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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const announcement_service_1 = require("./announcement.service");
const dto_1 = require("./dto");
let AnnouncementController = class AnnouncementController {
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async getAnnouncement(id) {
        return await this.announcementService.findAnnouncement(id);
    }
    async getAnnouncements(paging) {
        return await this.announcementService.findPagingAnnouncements(paging);
    }
    async createAnnouncement(data) {
        return await this.announcementService.createAnnouncement(data);
    }
    async updateAnnouncement(id, data) {
        return await this.announcementService.updateAnnouncement(id, data);
    }
    async deleteAnnouncement(id) {
        return await this.announcementService.deleteAnnouncement(id);
    }
};
__decorate([
    (0, common_1.Get)(':announcementId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공지사항 조회',
            summary: '공지사항 조회',
        },
        params: {
            name: 'announcementId',
            description: '공지사항 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AnnouncementDTO,
    }),
    __param(0, (0, common_1.Param)('announcementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "getAnnouncement", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공지사항 목록 조회',
            summary: '공지사항 목록 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AnnouncementDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "getAnnouncements", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공지사항 생성',
            summary: '공지사항 생성 - 관리자만 사용가능합니다.',
        },
        body: {
            type: dto_1.CreateAnnouncementDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAnnouncementDTO]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "createAnnouncement", null);
__decorate([
    (0, common_1.Patch)(':announcementId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공지사항 수정',
            summary: '공지사항 수정 - 관리자만 사용가능합니다.',
        },
        params: {
            name: 'announcementId',
            description: '공지사항 아이디',
            required: true,
            type: 'string',
        },
        body: {
            type: dto_1.UpdateAnnouncementDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('announcementId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAnnouncementDTO]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "updateAnnouncement", null);
__decorate([
    (0, common_1.Delete)(':announcementId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공지사항 삭제',
            summary: '공지사항 삭제 - 관리자만 사용가능합니다.',
        },
        params: {
            name: 'announcementId',
            description: '공지사항 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('announcementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "deleteAnnouncement", null);
AnnouncementController = __decorate([
    (0, utils_1.ApiController)('announcements', '공지사항'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
exports.AnnouncementController = AnnouncementController;
//# sourceMappingURL=announcement.controller.js.map