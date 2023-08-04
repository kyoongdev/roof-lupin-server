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
exports.SpaceRentalTypeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const package_rental_type_dto_1 = require("./package-rental-type.dto");
const time_rental_type_dto_1 = require("./time-rental-type.dto");
class SpaceRentalTypeDTO {
    constructor(props) {
        const timeRentalType = props.find((rentalType) => rentalType.rentalType === 1);
        const packageRentalType = props.filter((rentalType) => rentalType.rentalType === 2);
        this.timeRentalType = timeRentalType
            ? new time_rental_type_dto_1.TimeRentalTypeDTO({
                id: timeRentalType.id,
                name: timeRentalType.name,
                timeCostInfos: timeRentalType.timeCostInfo,
            })
            : null;
        this.packageRentalType = new package_rental_type_dto_1.PackageRentalTypeDTO(packageRentalType);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: time_rental_type_dto_1.TimeRentalTypeDTO, nullable: true, description: '시간 대여타입' } }),
    __metadata("design:type", time_rental_type_dto_1.TimeRentalTypeDTO)
], SpaceRentalTypeDTO.prototype, "timeRentalType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: package_rental_type_dto_1.PackageRentalTypeDTO, nullable: true, description: '패키지 대여타입' } }),
    __metadata("design:type", package_rental_type_dto_1.PackageRentalTypeDTO)
], SpaceRentalTypeDTO.prototype, "packageRentalType", void 0);
exports.SpaceRentalTypeDTO = SpaceRentalTypeDTO;
//# sourceMappingURL=space-rental-type.dto.js.map