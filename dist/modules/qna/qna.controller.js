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
exports.QnAController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const qna_service_1 = require("./qna.service");
let QnAController = class QnAController {
    constructor(qnaService) {
        this.qnaService = qnaService;
    }
    async getMyQnA(user) {
        return this.qnaService.findQnAs({
            where: {
                userId: user.id,
            },
        });
    }
    async getMyPagingQnA(paging, user) {
        return this.qnaService.findPagingQnAs(paging, {
            where: {
                userId: user.id,
            },
        });
    }
    async getSpaceQnA(spaceId) {
        return this.qnaService.findQnAs({
            where: {
                spaceId,
            },
        });
    }
    async getPagingSpaceQnA(spaceId, paging) {
        return this.qnaService.findPagingQnAs(paging, {
            where: {
                spaceId,
            },
        });
    }
    async createSpaceQnA(user, data) {
        return this.qnaService.createQnA(user.id, data);
    }
    async updateSpaceQnA(qnaId, user, data) {
        return this.qnaService.updateQnA(qnaId, user.id, data);
    }
    async deleteSpaceQnA(qnaId, user) {
        return this.qnaService.deleteQnA(qnaId, user.id);
    }
};
__decorate([
    (0, common_1.Get)('me/list'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 Q&A 조회',
            summary: '내 Q&A 조회 - 유저만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.QnADTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "getMyQnA", null);
__decorate([
    (0, common_1.Get)('me/paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 Q&A 조회',
            summary: '내 Q&A 조회 - 유저만 사용 가능합니다.',
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
], QnAController.prototype, "getMyPagingQnA", null);
__decorate([
    (0, common_1.Get)(':spaceId/list'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 Q&A 조회',
            summary: '공간 Q&A 조회',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.QnADTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "getSpaceQnA", null);
__decorate([
    (0, common_1.Get)(':spaceId/paging'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 Q&A 조회',
            summary: '공간 Q&A 조회',
        },
        params: {
            name: 'spaceId',
            type: 'string',
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
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "getPagingSpaceQnA", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 Q&A 생성',
            summary: '공간 Q&A 생성 - 유저만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateQnADTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateQnADTO]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "createSpaceQnA", null);
__decorate([
    (0, common_1.Patch)(':qnaId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 Q&A 수정',
            summary: '공간 Q&A 수정 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'qnaId',
            type: 'string',
            description: 'Q&A 아이디',
        },
        body: {
            type: dto_1.UpdateQnADTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('qnaId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateQnADTO]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "updateSpaceQnA", null);
__decorate([
    (0, common_1.Delete)(':qnaId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 Q&A 삭제',
            summary: '공간 Q&A 삭제 - 유저만 사용 가능합니다.',
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
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QnAController.prototype, "deleteSpaceQnA", null);
QnAController = __decorate([
    (0, utils_1.ApiController)('qnas', '공간 Q&A'),
    __metadata("design:paramtypes", [qna_service_1.QnAService])
], QnAController);
exports.QnAController = QnAController;
//# sourceMappingURL=qna.controller.js.map