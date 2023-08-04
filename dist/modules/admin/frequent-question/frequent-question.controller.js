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
exports.AdminFrequentlyQuestionController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../frequent-question/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const frequent_question_service_1 = require("./frequent-question.service");
let AdminFrequentlyQuestionController = class AdminFrequentlyQuestionController {
    constructor(frequentQuestionService) {
        this.frequentQuestionService = frequentQuestionService;
    }
    async getFrequentQuestion(id) {
        return await this.frequentQuestionService.findFrequentQuestion(id);
    }
    async getFrequentQuestions() {
        return await this.frequentQuestionService.findFrequentQuestions();
    }
    async createFrequentQuestion(body) {
        return await this.frequentQuestionService.createFrequentQuestion(body);
    }
    async updateFrequentQuestion(id, body) {
        await this.frequentQuestionService.updateFrequentQuestion(id, body);
    }
    async deleteFrequentQuestion(id) {
        await this.frequentQuestionService.deleteFrequentQuestion(id);
    }
};
__decorate([
    (0, common_1.Get)(':frequentQuestionId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '자주 묻는 질문 단일 조회',
            summary: '자주 묻는 질문 단일 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.FrequentQuestionDTO,
    }),
    __param(0, (0, common_1.Param)('frequentQuestionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFrequentlyQuestionController.prototype, "getFrequentQuestion", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '자주 묻는 질문 리스트 조회',
            summary: '자주 묻는 질문 리스트 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.FrequentQuestionDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminFrequentlyQuestionController.prototype, "getFrequentQuestions", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '자주 묻는 질문 생성',
            summary: '자주 묻는 질문 생성',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFrequentQuestionDTO]),
    __metadata("design:returntype", Promise)
], AdminFrequentlyQuestionController.prototype, "createFrequentQuestion", null);
__decorate([
    (0, common_1.Patch)(':frequentQuestionId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '자주 묻는 질문 수정',
            summary: '자주 묻는 질문 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('frequentQuestionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFrequentQuestionDTO]),
    __metadata("design:returntype", Promise)
], AdminFrequentlyQuestionController.prototype, "updateFrequentQuestion", null);
__decorate([
    (0, common_1.Delete)(':frequentQuestionId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '자주 묻는 질문 삭제',
            summary: '자주 묻는 질문 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('frequentQuestionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFrequentlyQuestionController.prototype, "deleteFrequentQuestion", null);
AdminFrequentlyQuestionController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('frequent-questions', '[관리자] 자주 묻는 질문'),
    __metadata("design:paramtypes", [frequent_question_service_1.AdminFrequentQuestionService])
], AdminFrequentlyQuestionController);
exports.AdminFrequentlyQuestionController = AdminFrequentlyQuestionController;
//# sourceMappingURL=frequent-question.controller.js.map