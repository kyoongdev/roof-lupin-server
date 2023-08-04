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
exports.ReportRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const report_exception_1 = require("./exception/report.exception");
let ReportRepository = class ReportRepository {
    constructor(database) {
        this.database = database;
    }
    async countReports(args = {}) {
        return await this.database.spaceReport.count(args);
    }
    async findReports(args = {}) {
        const reports = await this.database.spaceReport.findMany({
            where: args.where,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            include: {
                space: true,
                user: true,
                answer: true,
            },
            skip: args.skip,
            take: args.take,
        });
        return reports.map((report) => new dto_2.ReportDTO({
            ...report,
            isAnswered: !!report.answer,
        }));
    }
    async findReport(id) {
        const report = await this.database.spaceReport.findUnique({
            where: {
                id,
            },
            include: {
                space: {
                    include: {
                        location: true,
                        reviews: true,
                        publicTransportations: true,
                        userInterests: true,
                        rentalType: true,
                        categories: {
                            include: {
                                category: true,
                            },
                        },
                        reports: true,
                    },
                },
                user: true,
                answer: {
                    include: {
                        admin: true,
                    },
                },
            },
        });
        if (!report) {
            throw new report_exception_1.ReportException(errorCode_1.REPORT_ERROR_CODE.NOT_FOUND());
        }
        return new dto_2.ReportDetailDTO({
            ...report,
            isAnswered: !!report.answer,
            space: dto_1.SpaceDTO.generateSpaceDTO(report.space),
        });
    }
    async checkUserReportBySpaceId(spaceId, userId) {
        const report = await this.database.spaceReport.findFirst({
            where: {
                spaceId,
                userId,
            },
            include: {
                space: true,
                user: true,
                answer: true,
            },
        });
        if (!report) {
            return null;
        }
        return new dto_2.ReportDTO({
            ...report,
            isAnswered: !!report.answer,
        });
    }
    async createReport(userId, data) {
        const { spaceId, ...rest } = data;
        const report = await this.database.spaceReport.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                space: {
                    connect: {
                        id: spaceId,
                    },
                },
            },
        });
        return report.id;
    }
    async updateReport(id, data) {
        await this.database.spaceReport.update({
            where: {
                id,
            },
            data,
        });
    }
    async updateReportStatus(id, status) {
        await this.database.spaceReport.update({
            where: {
                id,
            },
            data: {
                reportStatus: status,
            },
        });
    }
    async deleteReport(id) {
        await this.database.spaceReport.delete({
            where: {
                id,
            },
        });
    }
    async findReportAnswer(id) {
        const reportAnswer = await this.database.spaceReportAnswer.findUnique({
            where: {
                id,
            },
            include: {
                admin: true,
            },
        });
        if (!reportAnswer) {
            throw new report_exception_1.ReportException(errorCode_1.REPORT_ERROR_CODE.NOT_FOUND(errorCode_1.REPORT_ANSWER_NOT_FOUND));
        }
        return new dto_2.ReportAnswerDTO(reportAnswer);
    }
    async createReportAnswer(adminId, reportId, data) {
        const report = await this.database.spaceReportAnswer.create({
            data: {
                ...data,
                admin: {
                    connect: {
                        id: adminId,
                    },
                },
                spaceReport: {
                    connect: {
                        id: reportId,
                    },
                },
            },
        });
        return report.id;
    }
    async updateReportAnswer(id, data) {
        await this.database.spaceReportAnswer.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteReportAnswer(id) {
        await this.database.spaceReportAnswer.delete({
            where: {
                id,
            },
        });
    }
};
ReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportRepository);
exports.ReportRepository = ReportRepository;
//# sourceMappingURL=report.repository.js.map