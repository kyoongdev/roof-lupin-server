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
exports.UpdateRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const day_validation_1 = require("../../../../utils/validation/day.validation");
const additional_service_1 = require("../additional-service");
const timeCostInfo_1 = require("../timeCostInfo");
const rental_type_validation_1 = require("../validation/rental-type.validation");
class UpdateRentalTypeDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.baseCost = props.baseCost;
            this.rentalType = props.rentalType;
            this.day = props.day;
            this.baseHour = props.baseHour;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
            this.timeCostInfos = props.timeCostInfos
                ?.map((timeCostInfo) => new timeCostInfo_1.UpdateTimeCostInfoDTO(timeCostInfo))
                .sort((a, b) => a.time - b.time);
            this.additionalServices = props.additionalServices.map((additionalService) => new additional_service_1.UpdateAdditionalServiceDTO(additionalService));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '대여타입 이름' } }),
    __metadata("design:type", String)
], UpdateRentalTypeDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '기본 가격' } }),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "baseCost", void 0);
__decorate([
    (0, rental_type_validation_1.RentalTypeReqDecorator)(),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "rentalType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } }),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "baseHour", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '시작 시간' } }),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "startAt", void 0);
__decorate([
    (0, day_validation_1.DayReqDecorator)(true),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '종료 시간' } }),
    __metadata("design:type", Number)
], UpdateRentalTypeDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: timeCostInfo_1.UpdateTimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } }),
    __metadata("design:type", Array)
], UpdateRentalTypeDTO.prototype, "timeCostInfos", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: additional_service_1.UpdateAdditionalServiceDTO, nullable: true, isArray: true, description: '추가 서비스 목록' },
    }),
    __metadata("design:type", Array)
], UpdateRentalTypeDTO.prototype, "additionalServices", void 0);
exports.UpdateRentalTypeDTO = UpdateRentalTypeDTO;
//# sourceMappingURL=update-rental-type.dto.js.map