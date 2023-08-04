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
exports.FaqRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const faq_exception_1 = require("./exception/faq.exception");
let FaqRepository = class FaqRepository {
    constructor(database) {
        this.database = database;
    }
    async findFAQ(id) {
        const faq = await this.database.fAQ.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        if (!faq) {
            throw new faq_exception_1.FAQException(errorCode_1.FAQ_ERROR_CODE.NOT_FOUND(errorCode_1.FAQ_NOT_FOUND));
        }
        return new dto_1.FAQDTO(faq);
    }
    async countFAQs(args = {}) {
        return await this.database.fAQ.count(args);
    }
    async findFAQs(args = {}) {
        const faqs = await this.database.fAQ.findMany({
            ...args,
            include: {
                user: true,
            },
        });
        return faqs.map((faq) => new dto_1.FAQDTO(faq));
    }
    async createFAQ(userId, data) {
        const faq = await this.database.fAQ.create({
            data: {
                ...data,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return faq.id;
    }
    async updateFAQ(id, data) {
        await this.findFAQ(id);
        await this.database.fAQ.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteFAQ(id) {
        await this.findFAQ(id);
        await this.database.fAQ.delete({
            where: {
                id,
            },
        });
    }
};
FaqRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FaqRepository);
exports.FaqRepository = FaqRepository;
//# sourceMappingURL=faq.repository.js.map