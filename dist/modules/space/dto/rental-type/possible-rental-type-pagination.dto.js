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
exports.PossibleRentalTypePaginationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class PossibleRentalTypePaginationDTO {
    constructor(props) {
        this.page = isNaN(Number(props.page)) ? 1 : Number(props.page);
        this.limit = isNaN(Number(props.limit)) ? 10 : Number(props.limit);
        this.maxSize = props.maxSize;
        this.hasPrev = this.page > 1;
        this.hasNext = this.page * this.limit < this.maxSize;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PossibleRentalTypePaginationDTO.prototype, "page", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PossibleRentalTypePaginationDTO.prototype, "limit", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number' } }),
    __metadata("design:type", Number)
], PossibleRentalTypePaginationDTO.prototype, "maxSize", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], PossibleRentalTypePaginationDTO.prototype, "hasPrev", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], PossibleRentalTypePaginationDTO.prototype, "hasNext", void 0);
exports.PossibleRentalTypePaginationDTO = PossibleRentalTypePaginationDTO;
//# sourceMappingURL=possible-rental-type-pagination.dto.js.map