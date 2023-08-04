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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const constants_1 = require("../../common/constants");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async validateAccount() {
        return await this.paymentService.validateAccount();
    }
    async validateAccountCallback(query) {
        return { asdf: 'asdfsa' };
    }
    async getBankCode() {
        return Object.entries(constants_1.BANK_CODE).map(([key, value]) => {
            return new dto_1.BankCodeDTO({
                code: value,
                name: key,
            });
        });
    }
    async getPaymentPayload(user, data) {
        return await this.paymentService.createPaymentPayload(user.id, data);
    }
    async completeTossPayment(data) {
        return await this.paymentService.confirmTossPayment(data);
    }
    async refundPayment(user, body) {
        return await this.paymentService.refundPayment(user.id, body);
    }
    async deletePaymentInfo(user, orderId) {
        await this.paymentService.deletePayment(orderId, user.id);
    }
};
__decorate([
    (0, common_1.Get)('/accounts/validate'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '계좌 유효성 검사하기 ',
            description: '계좌 유효성 검사하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "validateAccount", null);
__decorate([
    (0, common_1.Get)('/accounts'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '계좌 유효성 검사하기 ',
            description: '계좌 유효성 검사하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "validateAccountCallback", null);
__decorate([
    (0, common_1.Get)('/bank-code'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '은행 코드 조회하기 ',
            description: '은행 코드 조회하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.BankCodeDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getBankCode", null);
__decorate([
    (0, common_1.Post)('/payload'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '결제 용 data 생성 ',
            description: '결제 용 data 생성',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.PaymentPayloadDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePaymentPayloadDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentPayload", null);
__decorate([
    (0, common_1.Post)('/complete'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '결제 완료하기 ',
            description: '결제 완료하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ConfirmTossPaymentDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "completeTossPayment", null);
__decorate([
    (0, common_1.Post)('/refund'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            summary: '결제 취소하기 ',
            description: '결제 취소하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RefundPaymentDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "refundPayment", null);
__decorate([
    (0, common_1.Delete)('/failure/:orderId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '결제 실패 시 결제 정보 삭제하기',
            summary: '결제 실패 시 결제 정보 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePaymentInfo", null);
PaymentController = __decorate([
    (0, utils_1.ApiController)('payments', '결제'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map