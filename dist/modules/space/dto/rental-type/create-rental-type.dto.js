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
exports.CreateRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const day_validation_1 = require("../../../../utils/validation/day.validation");
const additional_service_1 = require("../additional-service");
const timeCostInfo_1 = require("../timeCostInfo");
const rental_type_validation_1 = require("../validation/rental-type.validation");
class CreateRentalTypeDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.baseCost = props.baseCost;
            this.rentalType = props.rentalType;
            this.baseHour = props.baseHour;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
            this.day = props.day;
            this.timeCostInfos = props.timeCostInfos
                ?.map((timeCostInfo) => new timeCostInfo_1.CreateTimeCostInfoDTO(timeCostInfo))
                .sort((a, b) => a.time - b.time);
            this.additionalServices = props.additionalServices.map((additionalService) => new additional_service_1.CreateAdditionalServiceDTO(additionalService));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '대여타입 이름' } }),
    __metadata("design:type", String)
], CreateRentalTypeDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '기본 가격 (시간 상품은 최소값)' } }),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "baseCost", void 0);
__decorate([
    (0, rental_type_validation_1.RentalTypeReqDecorator)(false),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "rentalType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } }),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "baseHour", void 0);
__decorate([
    (0, day_validation_1.DayReqDecorator)(),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '시작 시간' } }),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '종료 시간' } }),
    __metadata("design:type", Number)
], CreateRentalTypeDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: timeCostInfo_1.CreateTimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } }),
    __metadata("design:type", Array)
], CreateRentalTypeDTO.prototype, "timeCostInfos", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: additional_service_1.CreateAdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } }),
    __metadata("design:type", Array)
], CreateRentalTypeDTO.prototype, "additionalServices", void 0);
exports.CreateRentalTypeDTO = CreateRentalTypeDTO;
//# sourceMappingURL=create-rental-type.dto.js.map