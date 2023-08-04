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
exports.PossibleRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const day_validation_1 = require("../../../../utils/validation/day.validation");
const additional_service_1 = require("../additional-service");
const possible_time_cost_info_dto_1 = require("../timeCostInfo/possible-time-cost-info.dto");
const rental_type_validation_1 = require("../validation/rental-type.validation");
class PossibleRentalTypeDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.baseCost = props.baseCost;
        this.rentalType = props.rentalType;
        this.baseHour = props.baseHour;
        this.startAt = props.startAt;
        this.endAt = props.endAt;
        this.spaceId = props.spaceId;
        this.day = props.day;
        this.timeCostInfos = props.timeCostInfos
            ? props.timeCostInfos?.map((timeCostInfo) => new possible_time_cost_info_dto_1.PossibleTimeCostInfoDTO(timeCostInfo))
            : null;
        this.additionalServices = props.additionalServices.map((additionalService) => new additional_service_1.AdditionalServiceDTO(additionalService));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여타입 id' } }),
    __metadata("design:type", String)
], PossibleRentalTypeDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여타입 이름' } }),
    __metadata("design:type", String)
], PossibleRentalTypeDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '기본 가격' } }),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "baseCost", void 0);
__decorate([
    (0, rental_type_validation_1.RentalTypeResTransForm)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: rental_type_validation_1.RENTAL_TYPE_KEYS.join(',') } }),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "rentalType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } }),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "baseHour", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '시작 시간' } }),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '종료 시간' } }),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "endAt", void 0);
__decorate([
    (0, day_validation_1.DayResDecorator)(),
    __metadata("design:type", Number)
], PossibleRentalTypeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 id' } }),
    __metadata("design:type", String)
], PossibleRentalTypeDTO.prototype, "spaceId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: {
            type: possible_time_cost_info_dto_1.PossibleTimeCostInfoDTO,
            isArray: true,
            nullable: true,
            description: '시간 정보[패키지는 null]',
        },
    }),
    __metadata("design:type", Array)
], PossibleRentalTypeDTO.prototype, "timeCostInfos", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: additional_service_1.AdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } }),
    __metadata("design:type", Array)
], PossibleRentalTypeDTO.prototype, "additionalServices", void 0);
exports.PossibleRentalTypeDTO = PossibleRentalTypeDTO;
//# sourceMappingURL=possible-rental-type.dto.js.map