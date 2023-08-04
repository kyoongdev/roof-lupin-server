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
exports.QnARepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const qna_exception_1 = require("./exception/qna.exception");
let QnARepository = class QnARepository {
    constructor(database) {
        this.database = database;
    }
    async findQnAs(args = {}) {
        const qnas = await this.database.spaceQnA.findMany({
            where: args.where,
            include: {
                answers: {
                    include: {
                        host: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                user: true,
                space: {
                    include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                },
            },
            orderBy: {
                createdAt: 'desc',
                ...args.orderBy,
            },
            skip: args.skip,
            take: args.take,
        });
        return qnas.map((qna) => new dto_2.QnADTO({
            ...qna,
            space: dto_1.SpaceDTO.generateSpaceDTO(qna.space),
        }));
    }
    async countQna(args = {}) {
        return await this.database.spaceQnA.count(args);
    }
    async findQnA(id) {
        const qna = await this.database.spaceQnA.findUnique({
            where: {
                id,
            },
            include: {
                space: {
                    include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                },
                answers: {
                    include: {
                        host: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                user: true,
            },
        });
        if (!qna) {
            throw new qna_exception_1.QnAException(errorCode_1.QNA_ERROR_CODE.NOT_FOUND());
        }
        return new dto_2.QnADTO({
            ...qna,
            space: dto_1.SpaceDTO.generateSpaceDTO(qna.space),
        });
    }
    async createQnA(userId, data) {
        const qna = await this.database.spaceQnA.create({
            data: {
                content: data.content,
                space: {
                    connect: {
                        id: data.spaceId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return qna.id;
    }
    async updateQnA(id, data) {
        await this.database.spaceQnA.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteQnA(id) {
        await this.database.spaceQnA.delete({
            where: {
                id,
            },
        });
    }
    async findQnAAnswer(id) {
        const qnaAnswer = await this.database.spaceQnAAnswer.findUnique({
            where: {
                id,
            },
            include: {
                host: true,
            },
        });
        if (!qnaAnswer) {
            throw new qna_exception_1.QnAException(errorCode_1.QNA_ERROR_CODE.NOT_FOUND());
        }
        return new dto_2.QnAAnswerDTO(qnaAnswer);
    }
    async createQnAAnswer(hostId, data) {
        const qnaAnswer = await this.database.spaceQnAAnswer.create({
            data: {
                spaceQnA: {
                    connect: {
                        id: data.qnaId,
                    },
                },
                content: data.content,
                host: {
                    connect: {
                        id: hostId,
                    },
                },
            },
        });
        return qnaAnswer.id;
    }
    async updateQnAAnswer(id, data) {
        await this.database.spaceQnAAnswer.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteQnAAnswer(id) {
        await this.database.spaceQnAAnswer.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async hardDeleteQnAAnswer(id) {
        await this.database.spaceQnAAnswer.delete({
            where: {
                id,
            },
        });
    }
};
QnARepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QnARepository);
exports.QnARepository = QnARepository;
//# sourceMappingURL=qna.repository.js.map