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
exports.HostReportController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../report/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const report_service_1 = require("./report.service");
let HostReportController = class HostReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getReport(reportId) {
        return await this.reportService.findReport(reportId);
    }
    async getReportsBySpaceId(paging, spaceId, user) {
        return await this.reportService.findPagingReports(paging, {
            where: {
                spaceId,
                space: {
                    hostId: user.id,
                },
            },
        });
    }
    async getReports(paging, user) {
        return await this.reportService.findPagingReports(paging, {
            where: {
                space: {
                    hostId: user.id,
                },
            },
        });
    }
};
__decorate([
    (0, common_1.Get)(':reportId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 상세 조회',
            summary: '신고 상세 조회 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'reportId',
            type: 'string',
            required: true,
            description: '신고 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReportDTO,
    }),
    __param(0, (0, common_1.Param)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostReportController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 목록 조회',
            summary: '공간 신고 목록 조회 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            required: true,
            description: '공간 아이디',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReportDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Param)('spaceId')),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, String, Object]),
    __metadata("design:returntype", Promise)
], HostReportController.prototype, "getReportsBySpaceId", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 목록 조회',
            summary: ' 신고 목록 조회 - 호스트만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReportDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], HostReportController.prototype, "getReports", null);
HostReportController = __decorate([
    (0, utils_1.ApiController)('reports', '[호스트] 신고 관리'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    __metadata("design:paramtypes", [report_service_1.HostReportService])
], HostReportController);
exports.HostReportController = HostReportController;
//# sourceMappingURL=report.controller.js.map