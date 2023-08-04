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
exports.CreateReservationRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const additional_service_1 = require("../../space/dto/additional-service");
const validation_1 = require("./validation");
class CreateReservationRentalTypeDTO {
    constructor(props) {
        if (props) {
            this.rentalTypeId = props.rentalTypeId;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
            this.additionalServices = props.additionalServices?.map((service) => new additional_service_1.AdditionalServiceReservationDTO(service));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여 id' } }),
    __metadata("design:type", String)
], CreateReservationRentalTypeDTO.prototype, "rentalTypeId", void 0);
__decorate([
    (0, validation_1.TimeValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '대여 시작 시간' } }),
    __metadata("design:type", Number)
], CreateReservationRentalTypeDTO.prototype, "startAt", void 0);
__decorate([
    (0, validation_1.TimeValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '대여 종료 시간' } }),
    __metadata("design:type", Number)
], CreateReservationRentalTypeDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: additional_service_1.AdditionalServiceReservationDTO, isArray: true, nullable: true, description: '추가 서비스들' },
    }),
    __metadata("design:type", Array)
], CreateReservationRentalTypeDTO.prototype, "additionalServices", void 0);
exports.CreateReservationRentalTypeDTO = CreateReservationRentalTypeDTO;
//# sourceMappingURL=create-reservation-rental-type.dto.js.map