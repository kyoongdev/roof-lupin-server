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
exports.TaxReturnService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const tax_return_repository_1 = require("./tax-return.repository");
let TaxReturnService = class TaxReturnService {
    constructor(taxReturnRepository) {
        this.taxReturnRepository = taxReturnRepository;
    }
    async findTaxReturn(id) {
        return await this.taxReturnRepository.findTaxReturn(id);
    }
    async findPagingTaxReturns(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.taxReturnRepository.countTaxReturns({
            where: args.where,
        });
        const taxReturns = await this.taxReturnRepository.findTaxReturns({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(taxReturns, { count, paging });
    }
    async createTaxReturn(data) {
        return await this.taxReturnRepository.createTaxReturn(data);
    }
    async updateTaxReturn(id, data) {
        await this.findTaxReturn(id);
        await this.taxReturnRepository.updateTaxReturn(id, data);
    }
    async deleteTaxReturn(id) {
        await this.findTaxReturn(id);
        await this.taxReturnRepository.deleteTaxReturn(id);
        ``;
    }
};
TaxReturnService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tax_return_repository_1.TaxReturnRepository])
], TaxReturnService);
exports.TaxReturnService = TaxReturnService;
//# sourceMappingURL=tax-return.service.js.map