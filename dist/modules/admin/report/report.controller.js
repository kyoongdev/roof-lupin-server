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
exports.AdminReportController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../report/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const report_1 = require("../dto/query/report");
const report_2 = require("../dto/report");
const report_service_1 = require("./report.service");
let AdminReportController = class AdminReportController {
    constructor(adminReportService) {
        this.adminReportService = adminReportService;
    }
    async getReport(reportId) {
        return await this.adminReportService.findReport(reportId);
    }
    async getReports(paging, query) {
        return await this.adminReportService.findPagingReports(paging, query.generateQuery());
    }
    async updateReportStatus(reportId, body) {
        await this.adminReportService.updateReportStatus(reportId, body);
    }
    async createReportAnswer(user, reportId, body) {
        return await this.adminReportService.createReportAnswer(user.id, reportId, body);
    }
    async updateReportAnswer(id, user, body) {
        await this.adminReportService.updateReportAnswer(id, user.id, body);
    }
    async deleteReportAnswer(id, user) {
        await this.adminReportService.deleteReportAnswer(id, user.id);
    }
    async deleteReports(query) {
        await Promise.all(query.ids.split(',').map((id) => this.adminReportService.deleteReport(id)));
    }
};
__decorate([
    (0, common_1.Get)(':reportId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자]신고 상세 조회',
            summary: '신고 상세 조회',
        },
        params: {
            name: 'reportId',
            type: 'string',
            description: '신고 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReportDetailDTO,
    }),
    __param(0, (0, common_1.Param)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자]신고 조회',
            summary: '신고 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReportDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, report_1.AdminFindReportsQuery]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getReports", null);
__decorate([
    (0, common_1.Patch)(':reportId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 처리',
            summary: '신고 처리',
        },
        params: {
            name: 'reportId',
            type: 'string',
            description: '신고 아이디',
        },
        body: {
            type: report_2.AdminUpdateReportDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, report_2.AdminUpdateReportDTO]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "updateReportStatus", null);
__decorate([
    (0, common_1.Post)(':reportId/answers'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 답변 등록',
            summary: '신고 답변 등록',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('reportId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.CreateReportAnswerDTO]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "createReportAnswer", null);
__decorate([
    (0, common_1.Patch)('answers/:reportAnswerId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 답변 수정',
            summary: '신고 답변 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reportAnswerId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.UpdateReportAnswerDTO]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "updateReportAnswer", null);
__decorate([
    (0, common_1.Delete)('answers/:reportAnswerId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 답변 삭제',
            summary: '신고 답변 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reportAnswerId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "deleteReportAnswer", null);
__decorate([
    (0, common_1.Delete)('many'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '신고 다수 삭제하기',
            summary: '신고 다수 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdsDTO]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "deleteReports", null);
AdminReportController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('reports', '[관리자] 신고 관리'),
    __metadata("design:paramtypes", [report_service_1.AdminReportService])
], AdminReportController);
exports.AdminReportController = AdminReportController;
//# sourceMappingURL=report.controller.js.map