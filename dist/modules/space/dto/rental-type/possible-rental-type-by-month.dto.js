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
exports.PossibleRentalTypeByMonthDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const possible_rental_types_dto_1 = require("./possible-rental-types.dto");
class PossibleRentalTypeByMonthDTO {
    constructor(props) {
        this.day = props.day;
        this.isPossible = props.isPossible;
        this.isHoliday = props.isHoliday;
        this.rentalType = new possible_rental_types_dto_1.PossibleRentalTypesDTO(props.rentalType);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '요일' } }),
    __metadata("design:type", String)
], PossibleRentalTypeByMonthDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '가능 여부' } }),
    __metadata("design:type", Boolean)
], PossibleRentalTypeByMonthDTO.prototype, "isPossible", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '공휴일 여부' } }),
    __metadata("design:type", Boolean)
], PossibleRentalTypeByMonthDTO.prototype, "isHoliday", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_rental_types_dto_1.PossibleRentalTypesDTO, description: '대여 정보' } }),
    __metadata("design:type", possible_rental_types_dto_1.PossibleRentalTypesDTO)
], PossibleRentalTypeByMonthDTO.prototype, "rentalType", void 0);
exports.PossibleRentalTypeByMonthDTO = PossibleRentalTypeByMonthDTO;
//# sourceMappingURL=possible-rental-type-by-month.dto.js.map