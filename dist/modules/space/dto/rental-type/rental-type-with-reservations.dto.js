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
exports.RentalTypeWithReservationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../../reservation/dto");
const rental_type_dto_1 = require("./rental-type.dto");
class RentalTypeWithReservationDTO extends rental_type_dto_1.RentalTypeDTO {
    constructor(props) {
        super(props);
        this.reservations = props.reservations.map((reservation) => new dto_1.ReservationDTO(reservation));
        this.spaceId = props.spaceId;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.ReservationDTO, isArray: true, description: '예약 정보' } }),
    __metadata("design:type", Array)
], RentalTypeWithReservationDTO.prototype, "reservations", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 id' } }),
    __metadata("design:type", String)
], RentalTypeWithReservationDTO.prototype, "spaceId", void 0);
exports.RentalTypeWithReservationDTO = RentalTypeWithReservationDTO;
//# sourceMappingURL=rental-type-with-reservations.dto.js.map