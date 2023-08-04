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
exports.AdminQnAController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../qna/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const qna_service_1 = require("./qna.service");
let AdminQnAController = class AdminQnAController {
    constructor(adminQnAService) {
        this.adminQnAService = adminQnAService;
    }
    async findQnA(qnaId) {
        return await this.adminQnAService.findQnA(qnaId);
    }
    async findPagingQnAs(paging) {
        return await this.adminQnAService.findPagingQnAs(paging);
    }
    async deleteQnA(qnaId) {
        await this.adminQnAService.deleteQnA(qnaId);
    }
    async deleteQnAAnswer(qnaAnswerId) {
        await this.adminQnAService.deleteQnAAnswer(qnaAnswerId);
    }
    async hardDeleteQnAAnswer(qnaAnswerId) {
        await this.adminQnAService.hardDeleteQnAAnswer(qnaAnswerId);
    }
};
__decorate([
    (0, common_1.Get)(':qnaId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'Q&A 상세 조회',
            summary: 'Q&A 상세 조회',
        },
        params: {
            name: 'qnaId',
            type: 'string',
            description: 'Q&A 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.QnADTO,
    }),
    __param(0, (0, common_1.Param)('qnaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminQnAController.prototype, "findQnA", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'Q&A 조회',
            summary: 'Q&A 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.QnADTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminQnAController.prototype, "findPagingQnAs", null);
__decorate([
    (0, common_1.Delete)(':qnaId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'Q&A 삭제',
            summary: 'Q&A 삭제',
        },
        params: {
            name: 'qnaId',
            type: 'string',
            description: 'Q&A 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('qnaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminQnAController.prototype, "deleteQnA", null);
__decorate([
    (0, common_1.Delete)('/answer/:qnaAnswerId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'Q&A 답변 삭제',
            summary: 'Q&A 답변 삭제',
        },
        params: {
            name: 'qnaAnswerId',
            type: 'string',
            description: 'Q&A 답변 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('qnaAnswerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminQnAController.prototype, "deleteQnAAnswer", null);
__decorate([
    (0, common_1.Delete)('/answer/:qnaAnswerId/hard'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'Q&A 답변 hard delete',
            summary: 'Q&A 답변 hard delete',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('qnaAnswerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminQnAController.prototype, "hardDeleteQnAAnswer", null);
AdminQnAController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('qnas', '[관리자] Q&A 관리'),
    __metadata("design:paramtypes", [qna_service_1.AdminQnAService])
], AdminQnAController);
exports.AdminQnAController = AdminQnAController;
//# sourceMappingURL=index.js.map