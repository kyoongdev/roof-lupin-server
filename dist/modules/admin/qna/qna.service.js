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
exports.AdminQnAService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const qna_repository_1 = require("../../qna/qna.repository");
let AdminQnAService = class AdminQnAService {
    constructor(qnaRepository) {
        this.qnaRepository = qnaRepository;
    }
    async findQnA(qnaId) {
        return await this.qnaRepository.findQnA(qnaId);
    }
    async findPagingQnAs(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.qnaRepository.countQna();
        const qnas = await this.qnaRepository.findQnAs({
            where: {
                ...args.where,
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(qnas, { count, paging });
    }
    async deleteQnA(qnaId) {
        await this.qnaRepository.findQnA(qnaId);
        await this.qnaRepository.deleteQnA(qnaId);
    }
    async deleteQnAAnswer(qnaAnswerId) {
        await this.qnaRepository.findQnAAnswer(qnaAnswerId);
        await this.qnaRepository.deleteQnAAnswer(qnaAnswerId);
    }
    async hardDeleteQnAAnswer(qnaAnswerId) {
        await this.qnaRepository.findQnAAnswer(qnaAnswerId);
        await this.qnaRepository.hardDeleteQnAAnswer(qnaAnswerId);
    }
};
AdminQnAService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qna_repository_1.QnARepository])
], AdminQnAService);
exports.AdminQnAService = AdminQnAService;
//# sourceMappingURL=qna.service.js.map