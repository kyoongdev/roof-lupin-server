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
exports.QnAService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("./exception/errorCode");
const qna_exception_1 = require("./exception/qna.exception");
const qna_repository_1 = require("./qna.repository");
let QnAService = class QnAService {
    constructor(qnaRepository) {
        this.qnaRepository = qnaRepository;
    }
    async findPagingQnAs(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.qnaRepository.countQna();
        const qnas = await this.qnaRepository.findQnAs({
            where: {
                ...args.where,
                user: {
                    deletedAt: null,
                },
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
    async findQnAs(args = {}) {
        return await this.qnaRepository.findQnAs({
            where: args.where,
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
        });
    }
    async createQnA(userId, data) {
        return await this.qnaRepository.createQnA(userId, data);
    }
    async updateQnA(qnaId, userId, data) {
        await this.qnaRepository.findQnA(qnaId);
        await this.checkIsUserValid(qnaId, userId);
        await this.qnaRepository.updateQnA(qnaId, data);
    }
    async deleteQnA(qnaId, userId) {
        await this.qnaRepository.findQnA(qnaId);
        await this.checkIsUserValid(qnaId, userId);
        await this.qnaRepository.deleteQnA(qnaId);
    }
    async checkIsUserValid(qnaId, userId) {
        const qna = await this.qnaRepository.findQnA(qnaId);
        if (qna.user.id !== userId) {
            throw new qna_exception_1.QnAException(errorCode_1.QNA_ERROR_CODE.FORBIDDEN(errorCode_1.QNA_MUTATION_FORBIDDEN));
        }
    }
};
QnAService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qna_repository_1.QnARepository])
], QnAService);
exports.QnAService = QnAService;
//# sourceMappingURL=qna.service.js.map