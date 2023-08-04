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
exports.AdminFaqService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../faq/dto");
const errorCode_1 = require("../../faq/exception/errorCode");
const faq_exception_1 = require("../../faq/exception/faq.exception");
const faq_repository_1 = require("../../faq/faq.repository");
let AdminFaqService = class AdminFaqService {
    constructor(FaqRepository) {
        this.FaqRepository = FaqRepository;
    }
    async findFAQ(id) {
        const faq = await this.FaqRepository.findFAQ(id);
        if (!faq) {
            throw new faq_exception_1.FAQException(errorCode_1.FAQ_ERROR_CODE.NOT_FOUND(errorCode_1.FAQ_NOT_FOUND));
        }
        return new dto_1.FAQDTO(faq);
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
    async updateAnswerFAQ(id, data) {
        await this.findFAQ(id);
        await this.FaqRepository.updateFAQ(id, data);
    }
    async deleteFAQ(id) {
        await this.findFAQ(id);
        await this.FaqRepository.deleteFAQ(id);
    }
};
AdminFaqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_repository_1.FaqRepository])
], AdminFaqService);
exports.AdminFaqService = AdminFaqService;
//# sourceMappingURL=faq.service.js.map