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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTermsController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const terms_1 = require("../../../common/constants/terms");
const dto_1 = require("../../file/dto");
const dto_2 = require("../../terms/dto");
const utils_1 = require("../../../utils");
const terms_2 = require("../dto/terms");
const terms_service_1 = require("./terms.service");
let AdminTermsController = class AdminTermsController {
    constructor(termsService) {
        this.termsService = termsService;
    }
    async getTerms() {
        return await this.termsService.getTerms();
    }
    async getTerm(key) {
        return await this.termsService.getTerm(key);
    }
    async createTerm(body) {
        return await this.termsService.createTerm(body);
    }
    async updateTerm(name, body) {
        return await this.termsService.updateTerm(name, body);
    }
    async deleteTerm(name) {
        return await this.termsService.deleteTerm(name);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '약관 리스트 불러오기',
            summary: '약관 리스트 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TermDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminTermsController.prototype, "getTerms", null);
__decorate([
    (0, common_1.Get)(':name'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '약관 단건 불러오기',
            summary: '약관 단건 불러오기',
        },
        params: {
            type: 'string',
            enum: [...Object.values(terms_1.GUEST_TERMS), ...Object.values(terms_1.HOST_TERMS)],
            name: 'name',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TermDTO,
    }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTermsController.prototype, "getTerm", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '약관 생성하기',
            summary: '약관 생성하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [terms_2.CreateTermDTO]),
    __metadata("design:returntype", Promise)
], AdminTermsController.prototype, "createTerm", null);
__decorate([
    (0, common_1.Patch)(':name'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '약관 수정하기',
            summary: '약관 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
    }, 200),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, terms_2.UpdateTermDTO]),
    __metadata("design:returntype", Promise)
], AdminTermsController.prototype, "updateTerm", null);
__decorate([
    (0, common_1.Delete)(':name'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '약관 삭제하기',
            summary: '약관 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminTermsController.prototype, "deleteTerm", null);
AdminTermsController = __decorate([
    (0, utils_1.ApiController)('/terms', '[관리자] 약관 관리'),
    __metadata("design:paramtypes", [terms_service_1.AdminTermsService])
], AdminTermsController);
exports.AdminTermsController = AdminTermsController;
//# sourceMappingURL=terms.controller.js.map