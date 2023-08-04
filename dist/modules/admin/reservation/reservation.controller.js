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
exports.AdminReservationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../reservation/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const query_1 = require("../dto/query");
const reservation_service_1 = require("./reservation.service");
let AdminReservationController = class AdminReservationController {
    constructor(adminReservationService) {
        this.adminReservationService = adminReservationService;
    }
    async getReservations(paging, query) {
        return await this.adminReservationService.findPagingReservations(paging, query.generateQuery());
    }
    async getReservationDetail(id) {
        return await this.adminReservationService.findReservation(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '예약 목록 조회',
            summary: '예약 목록 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.AdminFindReservationsQuery]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "getReservations", null);
__decorate([
    (0, common_1.Get)(':reservationId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '예약 상세 조회',
            summary: '예약 상세 조회',
        },
        params: {
            name: 'reservationId',
            type: 'string',
            description: '예약 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDetailDTO,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReservationController.prototype, "getReservationDetail", null);
AdminReservationController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('reservations', '[관리자] 예약 관리'),
    __metadata("design:paramtypes", [reservation_service_1.AdminReservationService])
], AdminReservationController);
exports.AdminReservationController = AdminReservationController;
//# sourceMappingURL=reservation.controller.js.map