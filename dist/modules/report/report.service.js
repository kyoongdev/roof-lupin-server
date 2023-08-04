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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("../review/exception/errorCode");
const space_repository_1 = require("../space/space.repository");
const user_repository_1 = require("../user/user.repository");
const errorCode_2 = require("./exception/errorCode");
const report_exception_1 = require("./exception/report.exception");
const report_repository_1 = require("./report.repository");
let ReportService = class ReportService {
    constructor(reportRepository, spaceRepository, userRepository) {
        this.reportRepository = reportRepository;
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
    }
    async findReport(id) {
        return await this.reportRepository.findReport(id);
    }
    async findPagingReport(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reportRepository.countReports({
            where: args.where,
        });
        const reports = await this.reportRepository.findReports({
            where: args.where,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reports, { paging, count });
    }
    async findReports(args = {}) {
        const reports = await this.reportRepository.findReports({
            where: args.where,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
        return reports;
    }
    async createReports(userId, data) {
        await this.spaceRepository.findSpace(data.spaceId);
        const isExist = await this.reportRepository.checkUserReportBySpaceId(data.spaceId, userId);
        if (isExist) {
            throw new report_exception_1.ReportException(errorCode_2.REPORT_ERROR_CODE.CONFLICT(errorCode_2.REPORT_ALREADY_EXISTS));
        }
        return await this.reportRepository.createReport(userId, data);
    }
    async updateReport(reportId, userId, data) {
        await this.checkIsUserValid(reportId, userId);
        await this.reportRepository.updateReport(reportId, data);
    }
    async deleteReport(reportId, userId) {
        await this.checkIsUserValid(reportId, userId);
        await this.reportRepository.deleteReport(reportId);
    }
    async checkIsUserValid(reportId, userId) {
        const report = await this.reportRepository.findReport(reportId);
        if (report.user.id !== userId) {
            throw new report_exception_1.ReportException(errorCode_2.REPORT_ERROR_CODE.FORBIDDEN(errorCode_1.REVIEW_MUTATION_FORBIDDEN));
        }
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository,
        space_repository_1.SpaceRepository,
        user_repository_1.UserRepository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map