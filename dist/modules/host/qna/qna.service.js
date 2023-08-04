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
exports.HostQnAService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../../database/prisma.service");
const fcm_1 = require("../../../event/fcm");
const qna_repository_1 = require("../../qna/qna.repository");
const errorCode_1 = require("../exception/errorCode");
const host_exception_1 = require("../exception/host.exception");
let HostQnAService = class HostQnAService {
    constructor(qnaRepository, fcmEvent, database) {
        this.qnaRepository = qnaRepository;
        this.fcmEvent = fcmEvent;
        this.database = database;
    }
    async findQnA(id) {
        return await this.qnaRepository.findQnA(id);
    }
    async findPagingQnAs(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.qnaRepository.countQna({
            where: {
                ...args.where,
            },
        });
        const qnas = await this.qnaRepository.findQnAs({
            where: {
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(qnas, { count, paging });
    }
    async findQnAAnswer(id) {
        return await this.qnaRepository.findQnAAnswer(id);
    }
    async createQnAAnswer(hostId, data) {
        const qna = await this.findQnA(data.qnaId);
        const qnaAnswerId = await this.qnaRepository.createQnAAnswer(hostId, data);
        const user = await this.database.user.findUnique({
            where: {
                id: qna.user.id,
            },
            select: {
                id: true,
                pushToken: true,
                isAlarmAccepted: true,
                name: true,
                nickname: true,
            },
        });
        this.fcmEvent.createQnAAnswerAlarm({
            userId: user.id,
            pushToken: user.pushToken,
            spaceName: qna.space.title,
            nickname: user.nickname || user.name,
            isAlarmAccepted: user.isAlarmAccepted,
        });
        return qnaAnswerId;
    }
    async updateQnAAnswer(qnaAnswerId, hostId, data) {
        const answer = await this.findQnAAnswer(qnaAnswerId);
        if (answer.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.QNA_ANSWER_MUTATION_FORBIDDEN));
        }
        await this.qnaRepository.updateQnAAnswer(qnaAnswerId, data);
    }
    async deleteQnAAnswer(qnaAnswerId, hostId) {
        const answer = await this.findQnAAnswer(qnaAnswerId);
        if (answer.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.QNA_ANSWER_MUTATION_FORBIDDEN));
        }
        await this.qnaRepository.deleteQnAAnswer(qnaAnswerId);
    }
};
HostQnAService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qna_repository_1.QnARepository,
        fcm_1.FCMEvent,
        prisma_service_1.PrismaService])
], HostQnAService);
exports.HostQnAService = HostQnAService;
//# sourceMappingURL=qna.service.js.map