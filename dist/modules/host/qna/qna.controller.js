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
exports.HostQnAController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../qna/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const qna_service_1 = require("./qna.service");
let HostQnAController = class HostQnAController {
    constructor(qnaService) {
        this.qnaService = qnaService;
    }
    async getQnA(qnaId) {
        return await this.qnaService.findQnA(qnaId);
    }
    async getQnAsBySpaceID(paging, spaceId, user) {
        return await this.qnaService.findPagingQnAs(paging, {
            where: {
                spaceId,
                space: {
                    hostId: user.id,
                },
            },
        });
    }
    async getQnAs(paging, user) {
        return await this.qnaService.findPagingQnAs(paging, {
            where: {
                space: {
                    hostId: user.id,
                },
            },
        });
    }
    async createQnAAnswer(user, body) {
        return await this.qnaService.createQnAAnswer(user.id, body);
    }
    async updateQnAAnswer(answerId, user, body) {
        return await this.qnaService.updateQnAAnswer(answerId, user.id, body);
    }
    async deleteQnAAnswer(answerId, user) {
        return await this.qnaService.deleteQnAAnswer(answerId, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':qnaId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 상세 조회',
            summary: 'QnA 상세 조회 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'qnaId',
            type: 'string',
            required: true,
            description: 'QnA 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.QnADTO,
    }),
    __param(0, (0, common_1.Param)('qnaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "getQnA", null);
__decorate([
    (0, common_1.Get)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 목록 조회',
            summary: '공간 QnA 목록 조회 - 호스트만 사용 가능합니다.',
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
        type: dto_1.QnADTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Param)('spaceId')),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, String, Object]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "getQnAsBySpaceID", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 목록 조회',
            summary: 'QnA 목록 조회 - 호스트만 사용 가능합니다.',
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
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "getQnAs", null);
__decorate([
    (0, common_1.Post)('/answer'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 답변 등록',
            summary: 'QnA 답변 등록 - 호스트만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateQnAAnswerDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateQnAAnswerDTO]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "createQnAAnswer", null);
__decorate([
    (0, common_1.Post)('/answer/:answerId'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 답변 등록',
            summary: 'QnA 답변 등록 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'answerId',
            type: 'string',
            required: true,
            description: 'QnA 답변 아이디',
        },
        body: {
            type: dto_1.UpdateQnAAnswerDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('answerId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateQnAAnswerDTO]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "updateQnAAnswer", null);
__decorate([
    (0, common_1.Delete)('/answer/:answerId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: 'QnA 답변 삭제',
            summary: 'QnA 답변 삭제 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'answerId',
            type: 'string',
            required: true,
            description: 'QnA 답변 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('answerId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HostQnAController.prototype, "deleteQnAAnswer", null);
HostQnAController = __decorate([
    (0, utils_1.ApiController)('qnas', '[호스트] QnA 관리'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    __metadata("design:paramtypes", [qna_service_1.HostQnAService])
], HostQnAController);
exports.HostQnAController = HostQnAController;
//# sourceMappingURL=qna.controller.js.map