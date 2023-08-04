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
exports.AdminFrequentQuestionService = void 0;
const common_1 = require("@nestjs/common");
const frequent_question_repository_1 = require("../../frequent-question/frequent-question.repository");
let AdminFrequentQuestionService = class AdminFrequentQuestionService {
    constructor(frequentQuestionRepository) {
        this.frequentQuestionRepository = frequentQuestionRepository;
    }
    async findFrequentQuestion(id) {
        return await this.frequentQuestionRepository.findFrequentQuestion(id);
    }
    async findFrequentQuestions(args = {}) {
        return await this.frequentQuestionRepository.findFrequentQuestions(args);
    }
    async createFrequentQuestion(data) {
        return await this.frequentQuestionRepository.createFrequentQuestion(data);
    }
    async updateFrequentQuestion(id, data) {
        await this.frequentQuestionRepository.findFrequentQuestion(id);
        await this.frequentQuestionRepository.updateFrequentQuestion(id, data);
    }
    async deleteFrequentQuestion(id) {
        await this.frequentQuestionRepository.findFrequentQuestion(id);
        await this.frequentQuestionRepository.deleteFrequentQuestion(id);
    }
};
AdminFrequentQuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [frequent_question_repository_1.FrequentQuestionRepository])
], AdminFrequentQuestionService);
exports.AdminFrequentQuestionService = AdminFrequentQuestionService;
//# sourceMappingURL=frequent-question.service.js.map