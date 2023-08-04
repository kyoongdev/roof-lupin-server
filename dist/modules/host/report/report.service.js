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
exports.HostReportService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const report_repository_1 = require("../../report/report.repository");
let HostReportService = class HostReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async findReport(id) {
        return await this.reportRepository.findReport(id);
    }
    async findPagingReports(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reportRepository.countReports({
            where: {
                ...args.where,
            },
        });
        const reports = await this.reportRepository.findReports({
            where: {
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reports, { paging, count });
    }
};
HostReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository])
], HostReportService);
exports.HostReportService = HostReportService;
//# sourceMappingURL=report.service.js.map