"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const fcm_1 = require("../../event/fcm");
const utils_1 = require("../../utils");
const coupon_repository_1 = require("../coupon/coupon.repository");
const holiday_service_1 = require("../holiday/holiday.service");
const blocked_time_repository_1 = require("../host/blocked-time/blocked-time.repository");
const open_hour_repository_1 = require("../host/open-hour/open-hour.repository");
const settlement_repository_1 = require("../host/settlement/settlement.repository");
const space_holiday_repository_1 = require("../host/space-holiday/space-holiday.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const rental_type_service_1 = require("../space/rental-type/rental-type.service");
const space_repository_1 = require("../space/space.repository");
const user_repository_1 = require("../user/user.repository");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        providers: [
            utils_1.TossPayProvider,
            payment_service_1.PaymentService,
            reservation_repository_1.ReservationRepository,
            rental_type_repository_1.RentalTypeRepository,
            coupon_repository_1.CouponRepository,
            blocked_time_repository_1.BlockedTimeRepository,
            rental_type_service_1.RentalTypeService,
            space_repository_1.SpaceRepository,
            holiday_service_1.HolidayService,
            user_repository_1.UserRepository,
            fcm_1.FCMEvent,
            settlement_repository_1.SettlementRepository,
            utils_1.FinanceProvider,
            open_hour_repository_1.OpenHourRepository,
            space_holiday_repository_1.SpaceHolidayRepository,
        ],
        controllers: [payment_controller_1.PaymentController],
        exports: [
            utils_1.TossPayProvider,
            payment_service_1.PaymentService,
            rental_type_repository_1.RentalTypeRepository,
            coupon_repository_1.CouponRepository,
            blocked_time_repository_1.BlockedTimeRepository,
            rental_type_service_1.RentalTypeService,
            space_repository_1.SpaceRepository,
            holiday_service_1.HolidayService,
            user_repository_1.UserRepository,
            fcm_1.FCMEvent,
            settlement_repository_1.SettlementRepository,
        ],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map