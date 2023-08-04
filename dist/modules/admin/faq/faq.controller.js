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
exports.AdminFaqController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../faq/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const faq_1 = require("../dto/faq");
const faq_2 = require("../dto/query/faq");
const faq_service_1 = require("./faq.service");
let AdminFaqController = class AdminFaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async findFAQ(id) {
        return await this.faqService.findFAQ(id);
    }
    async findFAQs(paging, query) {
        return await this.faqService.findPagingFAQ(paging, query.generateQuery());
    }
    async updateFAQ(id, body) {
        await this.faqService.updateAnswerFAQ(id, body);
    }
    async deleteFAQ(id) {
        await this.faqService.deleteFAQ(id);
    }
};
__decorate([
    (0, common_1.Get)(':faqId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: ' FAQ 상세 조회',
            summary: ' FAQ 상세 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.FAQDTO,
    }),
    __param(0, (0, common_1.Param)('faqId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "findFAQ", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: ' FAQ 목록 조회',
            summary: ' FAQ 목록 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.FAQDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, faq_2.AdminFindFAQsQuery]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "findFAQs", null);
__decorate([
    (0, common_1.Patch)(':faqId/answer'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: ' FAQ 답변',
            summary: ' FAQ 답변 - 관리자만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('faqId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, faq_1.AdminUpdateFAQAnswerDTO]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "updateFAQ", null);
__decorate([
    (0, common_1.Delete)(':faqId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: ' FAQ 삭제',
            summary: ' FAQ 삭제 - 관리자만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('faqId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "deleteFAQ", null);
AdminFaqController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('/faqs', '[관리자] FAQ 관리'),
    __metadata("design:paramtypes", [faq_service_1.AdminFaqService])
], AdminFaqController);
exports.AdminFaqController = AdminFaqController;
//# sourceMappingURL=faq.controller.js.map