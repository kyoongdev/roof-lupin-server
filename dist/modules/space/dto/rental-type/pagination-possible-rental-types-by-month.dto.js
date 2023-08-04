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
exports.PaginationPossibleRentalTypesByMonthDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const possible_rental_type_pagination_dto_1 = require("./possible-rental-type-pagination.dto");
const possible_rental_types_by_month_dto_1 = require("./possible-rental-types-by-month.dto");
class PaginationPossibleRentalTypesByMonthDTO {
    constructor(props) {
        this.paging = new possible_rental_type_pagination_dto_1.PossibleRentalTypePaginationDTO(props.paging);
        this.data = props.data.map((item) => new possible_rental_types_by_month_dto_1.PossibleRentalTypesByMonthDTO(item));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_rental_type_pagination_dto_1.PossibleRentalTypePaginationDTO, description: '페이징 정보' } }),
    __metadata("design:type", possible_rental_type_pagination_dto_1.PossibleRentalTypePaginationDTO)
], PaginationPossibleRentalTypesByMonthDTO.prototype, "paging", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_rental_types_by_month_dto_1.PossibleRentalTypesByMonthDTO, isArray: true, description: '페이징 정보' } }),
    __metadata("design:type", Array)
], PaginationPossibleRentalTypesByMonthDTO.prototype, "data", void 0);
exports.PaginationPossibleRentalTypesByMonthDTO = PaginationPossibleRentalTypesByMonthDTO;
//# sourceMappingURL=pagination-possible-rental-types-by-month.dto.js.map