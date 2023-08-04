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
exports.FrequentQuestionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const frequent_question_exception_1 = require("./exception/frequent-question.exception");
let FrequentQuestionRepository = class FrequentQuestionRepository {
    constructor(database) {
        this.database = database;
    }
    async findFrequentQuestion(id) {
        const question = await this.database.frequentQuestion.findUnique({
            where: {
                id,
            },
        });
        if (!question) {
            throw new frequent_question_exception_1.FrequentQuestionException(errorCode_1.FREQUENT_QUESTION_ERROR_CODE.NOT_FOUND(errorCode_1.FREQUENT_QUESTION_NOT_FOUND));
        }
        return new dto_1.FrequentQuestionDTO(question);
    }
    async countFrequentQuestions(args = {}) {
        return await this.database.frequentQuestion.count(args);
    }
    async findFrequentQuestions(args = {}) {
        const questions = await this.database.frequentQuestion.findMany(args);
        return questions.map((question) => new dto_1.FrequentQuestionDTO(question));
    }
    async createFrequentQuestion(data) {
        const question = await this.database.frequentQuestion.create({
            data,
        });
        return question.id;
    }
    async updateFrequentQuestion(id, data) {
        await this.database.frequentQuestion.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteFrequentQuestion(id) {
        await this.database.frequentQuestion.delete({
            where: {
                id,
            },
        });
    }
};
FrequentQuestionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FrequentQuestionRepository);
exports.FrequentQuestionRepository = FrequentQuestionRepository;
//# sourceMappingURL=frequent-question.repository.js.map