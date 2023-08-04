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
exports.TaxReturnRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const tax_return_exception_1 = require("./exception/tax-return.exception");
let TaxReturnRepository = class TaxReturnRepository {
    constructor(database) {
        this.database = database;
    }
    async findTaxReturn(id) {
        const taxReturn = await this.database.taxReturn.findUnique({
            where: { id },
            include: {
                host: true,
            },
        });
        if (!taxReturn) {
            throw new tax_return_exception_1.TaxReturnException(errorCode_1.TAX_RETURN_ERROR_CODE.NOT_FOUND(errorCode_1.TAX_RETURN_NOT_FOUND));
        }
        return new dto_1.TaxReturnDTO(taxReturn);
    }
    async countTaxReturns(args = {}) {
        return await this.database.taxReturn.count(args);
    }
    async findTaxReturns(args = {}) {
        const taxReturns = await this.database.taxReturn.findMany({
            where: args.where,
            include: {
                host: true,
            },
            orderBy: {
                submittedAt: 'desc',
                ...args.orderBy,
            },
            ...args,
        });
        return taxReturns.map((taxReturn) => new dto_1.TaxReturnDTO({
            ...taxReturn,
            host: taxReturn.host,
        }));
    }
    async createTaxReturn(data) {
        const taxReturn = await this.database.taxReturn.create({
            data,
        });
        return taxReturn.id;
    }
    async updateTaxReturn(id, data) {
        await this.database.taxReturn.update({
            where: { id },
            data,
        });
    }
    async deleteTaxReturn(id) {
        await this.database.taxReturn.delete({
            where: { id },
        });
    }
};
TaxReturnRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaxReturnRepository);
exports.TaxReturnRepository = TaxReturnRepository;
//# sourceMappingURL=tax-return.repository.js.map