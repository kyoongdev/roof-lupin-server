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
exports.RentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const day_validation_1 = require("../../../../utils/validation/day.validation");
const additional_service_1 = require("../additional-service");
const timeCostInfo_1 = require("../timeCostInfo");
const rental_type_validation_1 = require("../validation/rental-type.validation");
class RentalTypeDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.baseCost = props.baseCost;
        this.rentalType = props.rentalType;
        this.day = props.day;
        this.baseHour = props.baseHour ?? null;
        this.startAt = props.startAt;
        this.endAt = props.endAt;
        this.spaceId = props.spaceId;
        this.additionalServices =
            props.additionalServices?.map((additionalService) => new additional_service_1.AdditionalServiceDTO(additionalService)) ?? [];
        if (props.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.TIME)
            this.timeCostInfos = props.timeCostInfo.map((timeCostInfo) => new timeCostInfo_1.TimeCostInfoDTO(timeCostInfo));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여타입 id' } }),
    __metadata("design:type", String)
], RentalTypeDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여타입 이름' } }),
    __metadata("design:type", String)
], RentalTypeDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '기본 가격' } }),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "baseCost", void 0);
__decorate([
    (0, rental_type_validation_1.RentalTypeResTransForm)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: rental_type_validation_1.RENTAL_TYPE_KEYS.join(',') } }),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "rentalType", void 0);
__decorate([
    (0, day_validation_1.DayResDecorator)(),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } }),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "baseHour", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '시작 시간' } }),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '종료 시간' } }),
    __metadata("design:type", Number)
], RentalTypeDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: timeCostInfo_1.TimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } }),
    __metadata("design:type", Array)
], RentalTypeDTO.prototype, "timeCostInfos", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 ID' } }),
    __metadata("design:type", String)
], RentalTypeDTO.prototype, "spaceId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: additional_service_1.AdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } }),
    __metadata("design:type", Array)
], RentalTypeDTO.prototype, "additionalServices", void 0);
exports.RentalTypeDTO = RentalTypeDTO;
//# sourceMappingURL=rental-type.dto.js.map