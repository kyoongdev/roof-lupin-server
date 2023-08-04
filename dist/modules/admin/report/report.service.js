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
exports.AdminReportService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const fcm_1 = require("../../../event/fcm");
const errorCode_1 = require("../../report/exception/errorCode");
const report_exception_1 = require("../../report/exception/report.exception");
const report_repository_1 = require("../../report/report.repository");
const user_repository_1 = require("../user/user.repository");
let AdminReportService = class AdminReportService {
    constructor(reportRepository, fcmEvent, userRepository) {
        this.reportRepository = reportRepository;
        this.fcmEvent = fcmEvent;
        this.userRepository = userRepository;
    }
    async findReport(reportId) {
        return await this.reportRepository.findReport(reportId);
    }
    async findPagingReports(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reportRepository.countReports({
            where: args.where,
        });
        const reports = await this.reportRepository.findReports({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reports, { count, paging });
    }
    async updateReportStatus(id, data) {
        await this.reportRepository.updateReportStatus(id, data.reportStatus);
    }
    async createReportAnswer(adminId, reportId, data) {
        const report = await this.reportRepository.findReport(reportId);
        const answerId = await this.reportRepository.createReportAnswer(adminId, reportId, data);
        const user = await this.userRepository.findUser(report.user.id);
        if (user.pushToken && user.isAlarmAccepted) {
            this.fcmEvent.sendAlarm({
                pushToken: user.pushToken,
                userId: user.id,
            }, { title: '신고가 아래와 같이 조치가 완료됐습니다.', body: data.content });
        }
        return answerId;
    }
    async updateReportAnswer(id, adminId, data) {
        const reportAnswer = await this.reportRepository.findReportAnswer(id);
        if (reportAnswer.admin.id !== adminId) {
            throw new report_exception_1.ReportException(errorCode_1.REPORT_ERROR_CODE.FORBIDDEN(errorCode_1.REPORT_ANSWER_MUTATION_FORBIDDEN));
        }
        await this.reportRepository.updateReportAnswer(id, data);
    }
    async deleteReport(id) {
        await this.findReport(id);
        await this.reportRepository.deleteReport(id);
    }
    async deleteReportAnswer(id, adminId) {
        const reportAnswer = await this.reportRepository.findReportAnswer(id);
        if (reportAnswer.admin.id !== adminId) {
            throw new report_exception_1.ReportException(errorCode_1.REPORT_ERROR_CODE.FORBIDDEN(errorCode_1.REPORT_ANSWER_MUTATION_FORBIDDEN));
        }
        await this.reportRepository.deleteReportAnswer(id);
    }
};
AdminReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository,
        fcm_1.FCMEvent,
        user_repository_1.AdminUserRepository])
], AdminReportService);
exports.AdminReportService = AdminReportService;
//# sourceMappingURL=report.service.js.map