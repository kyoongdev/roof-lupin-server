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
exports.PackageRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const rental_type_dto_1 = require("./rental-type.dto");
class PackageRentalTypeDTO {
    constructor(props) {
        const rentalTypes = props.filter((rentalType) => rentalType.rentalType === 2);
        this.minPrice = Math.min(...rentalTypes.map((rentalType) => rentalType.baseCost));
        this.maxPrice = Math.max(...rentalTypes.map((rentalType) => rentalType.baseCost));
        this.rentalTypes = rentalTypes.map((rentalType) => new rental_type_dto_1.RentalTypeDTO(rentalType));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '최소가격' } }),
    __metadata("design:type", Number)
], PackageRentalTypeDTO.prototype, "minPrice", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '최대가격' } }),
    __metadata("design:type", Number)
], PackageRentalTypeDTO.prototype, "maxPrice", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: rental_type_dto_1.RentalTypeDTO, isArray: true, description: '상세 요금 (더보기) ' } }),
    __metadata("design:type", Array)
], PackageRentalTypeDTO.prototype, "rentalTypes", void 0);
exports.PackageRentalTypeDTO = PackageRentalTypeDTO;
//# sourceMappingURL=package-rental-type.dto.js.map