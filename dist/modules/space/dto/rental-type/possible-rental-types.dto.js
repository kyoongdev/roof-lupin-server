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
exports.PossibleRentalTypesDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const possible_package_dto_1 = require("./possible-package.dto");
const possible_rental_type_dto_1 = require("./possible-rental-type.dto");
class PossibleRentalTypesDTO {
    constructor(props) {
        this.time = props.time ? new possible_rental_type_dto_1.PossibleRentalTypeDTO(props.time) : null;
        this.package = props.package.map((pkg) => new possible_package_dto_1.PossiblePackageDTO(pkg));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_rental_type_dto_1.PossibleRentalTypeDTO, nullable: true, description: '시간대여타입' } }),
    __metadata("design:type", possible_rental_type_dto_1.PossibleRentalTypeDTO)
], PossibleRentalTypesDTO.prototype, "time", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: possible_package_dto_1.PossiblePackageDTO, isArray: true, description: '패키지대여타입' } }),
    __metadata("design:type", Array)
], PossibleRentalTypesDTO.prototype, "package", void 0);
exports.PossibleRentalTypesDTO = PossibleRentalTypesDTO;
//# sourceMappingURL=possible-rental-types.dto.js.map