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
exports.SettlementDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("..");
const dto_2 = require("../../../reservation/dto");
const settlement_dto_1 = require("./settlement.dto");
class SettlementDetailDTO extends settlement_dto_1.SettlementDTO {
    constructor(props) {
        super(props);
        this.reservations = props.reservations.map((reservation) => new dto_2.ReservationDTO(reservation));
        this.host = new dto_1.HostDTO(props.host);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.ReservationDTO, isArray: true, description: '예약 정보' } }),
    __metadata("design:type", Array)
], SettlementDetailDTO.prototype, "reservations", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.HostDTO, description: '호스트 정보' } }),
    __metadata("design:type", dto_1.HostDTO)
], SettlementDetailDTO.prototype, "host", void 0);
exports.SettlementDetailDTO = SettlementDetailDTO;
//# sourceMappingURL=settlement-detail.dto.js.map