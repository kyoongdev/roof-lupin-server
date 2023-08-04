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
exports.CreatePaymentDTO = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
const create_reservation_rental_type_dto_1 = require("./create-reservation-rental-type.dto");
class CreatePaymentDTO {
    constructor(props) {
        if (props) {
            this.year = props.year;
            this.month = props.month;
            this.day = props.day;
            this.userName = props.userName;
            this.userPhoneNumber = props.userPhoneNumber;
            this.totalCost = props.totalCost;
            this.rentalTypes = props.rentalTypes.map((rentalType) => new create_reservation_rental_type_dto_1.CreateReservationRentalTypeDTO(rentalType));
            this.spaceId = props.spaceId;
            this.userCount = props.userCount;
            this.discountCost = props.discountCost;
            this.originalCost = props.originalCost;
            this.userCouponIds = props.userCouponIds;
            this.reservationId = props.reservationId;
        }
    }
    validateProperties(target) {
        if (this.year !== target.year ||
            this.month !== target.month ||
            this.day !== target.day ||
            this.userName !== target.userName ||
            this.userPhoneNumber !== target.userPhoneNumber ||
            this.spaceId !== target.spaceId) {
            throw new common_1.BadRequestException('예약 정보가 일치하지 않습니다.');
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 연도' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 월' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 일' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대표 이용자 이름' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "userName", void 0);
__decorate([
    (0, validation_1.PhoneNumberValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대표 이용자 전화번호' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "userPhoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', minimum: 1, description: '이용 인원' } }),
    __metadata("design:type", Number)
], CreatePaymentDTO.prototype, "userCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '예약 비용' } }),
    __metadata("design:type", Number)
], CreatePaymentDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '할인 금액' } }),
    __metadata("design:type", Number)
], CreatePaymentDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '할인제외 예약 비용' } }),
    __metadata("design:type", Number)
], CreatePaymentDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: create_reservation_rental_type_dto_1.CreateReservationRentalTypeDTO, isArray: true, description: '대여 타입들' } }),
    __metadata("design:type", Array)
], CreatePaymentDTO.prototype, "rentalTypes", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 아이디' } }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "spaceId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', isArray: true, nullable: true, description: '유저가 가지고 있는 쿠폰 IDs' },
    }),
    __metadata("design:type", Array)
], CreatePaymentDTO.prototype, "userCouponIds", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', nullable: true, description: '승인결제 예약 id' },
    }),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "reservationId", void 0);
exports.CreatePaymentDTO = CreatePaymentDTO;
//# sourceMappingURL=create-payment.js.map