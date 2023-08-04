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
exports.ReservationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
const dto_2 = require("../../user/dto");
const base_reservation_dto_1 = require("./base-reservation.dto");
const reservation_rental_type_dto_1 = require("./reservation-rental-type.dto");
class ReservationDTO extends base_reservation_dto_1.BaseReservationDTO {
    constructor(props) {
        super(props);
        this.isReviewed = props.isReviewed;
        this.user = new dto_2.CommonUserDTO(props.user);
        this.rentalTypes = props.rentalTypes.map((rentalType) => new reservation_rental_type_dto_1.ReservationRentalTypeDTO(rentalType));
        this.space = new dto_1.SpaceDTO(props.space);
    }
    static generateReservationDTO(reservation) {
        const { rentalTypes, ...rest } = reservation;
        const { space } = rentalTypes[0].rentalType;
        const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;
        return {
            ...rest,
            year: `${rest.year}`,
            month: `${rest.month}`,
            day: `${rest.day}`,
            user: rest.user,
            rentalTypes: rentalTypes.map((rentalType) => rentalType),
            space: dto_1.SpaceDTO.generateSpaceDTO(space),
            isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.CommonUserDTO, description: '유저 정보' } }),
    __metadata("design:type", dto_2.CommonUserDTO)
], ReservationDTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: reservation_rental_type_dto_1.ReservationRentalTypeDTO, isArray: true, description: '대여 정보' } }),
    __metadata("design:type", Array)
], ReservationDTO.prototype, "rentalTypes", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.SpaceDTO, description: '공간 정보' } }),
    __metadata("design:type", dto_1.SpaceDTO)
], ReservationDTO.prototype, "space", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } }),
    __metadata("design:type", Boolean)
], ReservationDTO.prototype, "isReviewed", void 0);
exports.ReservationDTO = ReservationDTO;
//# sourceMappingURL=reservation.dto.js.map