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
exports.FrequentQuestionController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const frequent_question_service_1 = require("./frequent-question.service");
let FrequentQuestionController = class FrequentQuestionController {
    constructor(frequentQuestionService) {
        this.frequentQuestionService = frequentQuestionService;
    }
    async getFrequentQuestion(id) {
        return await this.frequentQuestionService.findFrequentQuestion(id);
    }
    async getFrequentQuestions() {
        return await this.frequentQuestionService.findFrequentQuestions();
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
], FrequentQuestionController.prototype, "getFrequentQuestion", null);
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FrequentQuestionController.prototype, "getFrequentQuestions", null);
FrequentQuestionController = __decorate([
    (0, utils_1.ApiController)('frequent-questions', '자주 묻는 질문'),
    __metadata("design:paramtypes", [frequent_question_service_1.FrequentQuestionService])
], FrequentQuestionController);
exports.FrequentQuestionController = FrequentQuestionController;
//# sourceMappingURL=frequent-question.controller.js.map