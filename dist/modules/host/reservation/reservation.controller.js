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
exports.HostReservationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../reservation/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const reservation_service_1 = require("./reservation.service");
let HostReservationController = class HostReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async getReservationDetail(user, id) {
        return await this.reservationService.findReservation(id, user.id);
    }
    async getReservationList(user, paging) {
        return await this.reservationService.findPagingReservations(paging, user.id);
    }
    async approveReservation(user, id) {
        return await this.reservationService.approveReservation(id, user.id);
    }
    async cancelReservation(user, id) {
        return await this.reservationService.cancelReservation(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':reservationId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '예약 상세 조회하기',
            description: '예약 상세 조회하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDetailDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostReservationController.prototype, "getReservationDetail", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '예약 목록 조회하기',
            description: '예약 목록 조회하기',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], HostReservationController.prototype, "getReservationList", null);
__decorate([
    (0, common_1.Post)(':reservationId/approve'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '예약 승인하기',
            description: '예약 승인하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostReservationController.prototype, "approveReservation", null);
__decorate([
    (0, common_1.Post)(':reservationId/cancel'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '예약 취소하기',
            description: '예약 취소하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostReservationController.prototype, "cancelReservation", null);
HostReservationController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, utils_1.ApiController)('/reservations', '[호스트] 예약 관리'),
    __metadata("design:paramtypes", [reservation_service_1.HostReservationService])
], HostReservationController);
exports.HostReservationController = HostReservationController;
//# sourceMappingURL=reservation.controller.js.map