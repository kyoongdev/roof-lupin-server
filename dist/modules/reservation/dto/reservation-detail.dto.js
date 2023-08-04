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
exports.ReservationDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
const reservation_dto_1 = require("./reservation.dto");
class ReservationDetailDTO extends reservation_dto_1.ReservationDTO {
    constructor(props) {
        super(props);
        this.orderId = props.orderId;
        this.orderResultId = props.orderResultId;
        this.payMethod = props.payMethod;
        this.refundCost = props.refundCost;
        this.isApproved = props.isApproved;
        this.approvedAt = props.approvedAt;
    }
    static generateReservationDetailDTO(reservation) {
        const { rentalTypes, ...rest } = reservation;
        const { space } = rentalTypes[0].rentalType;
        return {
            ...rest,
            year: String(rest.year),
            month: String(rest.month),
            day: String(rest.day),
            rentalTypes: rentalTypes.map((rentalType) => rentalType),
            space: dto_1.SpaceDTO.generateSpaceDTO(space),
            isReviewed: rest.spaceReviews.length > 0,
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '주문번호' } }),
    __metadata("design:type", String)
], ReservationDetailDTO.prototype, "orderId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '주문결과번호' } }),
    __metadata("design:type", String)
], ReservationDetailDTO.prototype, "orderResultId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '결제방식' } }),
    __metadata("design:type", Number)
], ReservationDetailDTO.prototype, "payMethod", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '환불 금액' } }),
    __metadata("design:type", Number)
], ReservationDetailDTO.prototype, "refundCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '승인 여부' } }),
    __metadata("design:type", Boolean)
], ReservationDetailDTO.prototype, "isApproved", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '승인일' } }),
    __metadata("design:type", Date)
], ReservationDetailDTO.prototype, "approvedAt", void 0);
exports.ReservationDetailDTO = ReservationDetailDTO;
//# sourceMappingURL=reservation-detail.dto.js.map