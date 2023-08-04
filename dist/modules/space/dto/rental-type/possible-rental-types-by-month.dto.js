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
exports.PossibleRentalTypesByMonthDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const possible_rental_type_by_month_dto_1 = require("./possible-rental-type-by-month.dto");
class PossibleRentalTypesByMonthDTO {
    constructor(props) {
        this.year = props.year;
        this.month = props.month;
        this.days = props.days.map((item) => new possible_rental_type_by_month_dto_1.PossibleRentalTypeByMonthDTO(item));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '년도' } }),
    __metadata("design:type", String)
], PossibleRentalTypesByMonthDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '월' } }),
    __metadata("design:type", String)
], PossibleRentalTypesByMonthDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_rental_type_by_month_dto_1.PossibleRentalTypeByMonthDTO, isArray: true, description: '일별 대여 정보' } }),
    __metadata("design:type", Array)
], PossibleRentalTypesByMonthDTO.prototype, "days", void 0);
exports.PossibleRentalTypesByMonthDTO = PossibleRentalTypesByMonthDTO;
//# sourceMappingURL=possible-rental-types-by-month.dto.js.map