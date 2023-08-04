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
exports.RentalTypeController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const query_1 = require("../dto/query");
const possible_rental_type_paging_dto_1 = require("../dto/query/possible-rental-type-paging.dto");
const rental_type_1 = require("../dto/rental-type");
const rental_type_service_1 = require("./rental-type.service");
let RentalTypeController = class RentalTypeController {
    constructor(rentalTypeService) {
        this.rentalTypeService = rentalTypeService;
    }
    async getSpaceRentalTypeDetail(spaceId) {
        return await this.rentalTypeService.findSpaceRentalTypeDetail(spaceId);
    }
    async getSpaceRentalTypes(spaceId) {
        return await this.rentalTypeService.findSpaceRentalTypes(spaceId);
    }
    async getPossibleSpaceRentalTypes(spaceId, query) {
        return await this.rentalTypeService.findPossibleRentalTypesBySpaceId(spaceId, query);
    }
    async getPossibleSpaceRentalTypesByMoth(spaceId, query) {
        return await this.rentalTypeService.findPossibleRentalTypesBySpaceIdWithMonth(spaceId, query);
    }
    async getPagingPossibleSpaceRentalTypesByMoth(spaceId, query) {
        return await this.rentalTypeService.findPagingPossibleRentalTypesBySpaceIdWithMonth(spaceId, query);
    }
};
__decorate([
    (0, common_1.Get)(':spaceId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 대여 타입 상세 조회하기',
            summary: '공간 대여 타입 상세 조회하기',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
            required: true,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.SpaceRentalTypeDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalTypeController.prototype, "getSpaceRentalTypeDetail", null);
__decorate([
    (0, common_1.Get)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 대여 타입  조회하기',
            summary: '공간 대여 타입  조회하기',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
            required: true,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.RentalTypeDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalTypeController.prototype, "getSpaceRentalTypes", null);
__decorate([
    (0, common_1.Get)(':spaceId/possible'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 및 날짜별 가능한 대여 타입  조회하기',
            summary: '공간 및 날짜별 가능한 대여 타입  조회하기 -유저만 사용 가능',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
            required: true,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.PossibleRentalTypesDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_1.PossibleRentalTypeQuery]),
    __metadata("design:returntype", Promise)
], RentalTypeController.prototype, "getPossibleSpaceRentalTypes", null);
__decorate([
    (0, common_1.Get)(':spaceId/possible/month'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 및 날짜별 가능한 대여 타입  조회하기',
            summary: '공간 및 날짜별 가능한 대여 타입  조회하기 -유저만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.PossibleRentalTypesDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_1.PossibleRentalTypeByMonthQuery]),
    __metadata("design:returntype", Promise)
], RentalTypeController.prototype, "getPossibleSpaceRentalTypesByMoth", null);
__decorate([
    (0, common_1.Get)(':spaceId/possible/month/paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 및 날짜별 가능한 대여 타입  조회하기',
            summary: '공간 및 날짜별 가능한 대여 타입  조회하기 -유저만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: rental_type_1.PossibleRentalTypesDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, possible_rental_type_paging_dto_1.PossibleRentalTypePagingDTO]),
    __metadata("design:returntype", Promise)
], RentalTypeController.prototype, "getPagingPossibleSpaceRentalTypesByMoth", null);
RentalTypeController = __decorate([
    (0, utils_1.ApiController)('rental-types', '대여 타입'),
    __metadata("design:paramtypes", [rental_type_service_1.RentalTypeService])
], RentalTypeController);
exports.RentalTypeController = RentalTypeController;
//# sourceMappingURL=rental-type.controller.js.map