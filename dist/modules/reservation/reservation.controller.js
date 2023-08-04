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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const payment_service_1 = require("../payment/payment.service");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const reservation_service_1 = require("./reservation.service");
let ReservationController = class ReservationController {
    constructor(reservationService, paymentService) {
        this.reservationService = reservationService;
        this.paymentService = paymentService;
    }
    async getMyCloseReservations(user) {
        return await this.reservationService.findMyCloseReservation(user.id);
    }
    async getMyReservations(paging, user, query) {
        return await this.reservationService.findMyPagingReservations(paging, user.id, query.generateQuery());
    }
    async getMyReservation(id, user) {
        return await this.reservationService.findMyReservation(id, user.id);
    }
    async createPayment(user, body) {
        return await this.paymentService.requestPayment(user.id, body);
    }
    async deleteReservation(id, user) {
        return await this.reservationService.deleteMyReservation(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)('me/close'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 근접한 예약 조회',
            summary: '내 근접한 예약 조회 response nullable',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getMyCloseReservations", null);
__decorate([
    (0, common_1.Get)('me/paging'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 예약 조회',
            summary: '내 예약 조회 - 유저만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object, query_1.FindReservationQuery]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getMyReservations", null);
__decorate([
    (0, common_1.Get)(':reservationId/me'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 예약 상세 조회',
            summary: '내 예약 상세 조회 - 유저만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReservationDetailDTO,
    }),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getMyReservation", null);
__decorate([
    (0, common_1.Post)('prepare'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '예약 신청하기',
            summary: '예약 신청하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateReservationDTO]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Delete)(':reservationId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '예약 삭제하기',
            summary: '예약 삭제하기 - 유저만 사용가능합니다.',
        },
        params: {
            name: 'reservationId',
            type: 'string',
            description: '예약 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reservationId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteReservation", null);
ReservationController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, utils_1.ApiController)('reservations', '예약하기'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService,
        payment_service_1.PaymentService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map