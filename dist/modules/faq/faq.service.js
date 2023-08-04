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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const errorCode_1 = require("./exception/errorCode");
const faq_exception_1 = require("./exception/faq.exception");
const faq_repository_1 = require("./faq.repository");
let FaqService = class FaqService {
    constructor(FaqRepository) {
        this.FaqRepository = FaqRepository;
    }
    async findFAQ(id) {
        return await this.FaqRepository.findFAQ(id);
    }
    async findPagingFAQ(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.FaqRepository.countFAQs({
            where: args.where,
        });
        const faqs = await this.FaqRepository.findFAQs({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(faqs, { count, paging });
    }
    async createFAQ(userId, data) {
        return await this.FaqRepository.createFAQ(userId, data);
    }
    async updateFAQ(id, userId, data) {
        const faq = await this.findFAQ(id);
        if (faq.user.id !== userId) {
            throw new faq_exception_1.FAQException(errorCode_1.FAQ_ERROR_CODE.FORBIDDEN(errorCode_1.FAQ_MUTATION_FORBIDDEN));
        }
        await this.FaqRepository.updateFAQ(id, data);
    }
    async deleteFAQ(id, userId) {
        const faq = await this.findFAQ(id);
        if (faq.user.id !== userId) {
            throw new faq_exception_1.FAQException(errorCode_1.FAQ_ERROR_CODE.FORBIDDEN(errorCode_1.FAQ_MUTATION_FORBIDDEN));
        }
        await this.FaqRepository.deleteFAQ(id);
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_repository_1.FaqRepository])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map