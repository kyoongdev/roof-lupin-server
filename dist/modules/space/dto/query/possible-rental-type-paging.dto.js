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
exports.PossibleRentalTypePagingDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class PossibleRentalTypePagingDTO {
    constructor(props) {
        if (props) {
            this.page = props.page;
            this.limit = props.limit;
            this.maxSize = props.maxSize;
            this.startYear = props.startYear;
            this.startMonth = props.startMonth;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', minimum: 1, default: 1 } }),
    __metadata("design:type", Number)
], PossibleRentalTypePagingDTO.prototype, "page", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', minimum: 1, default: 20 } }),
    __metadata("design:type", Number)
], PossibleRentalTypePagingDTO.prototype, "limit", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', minimum: 1, default: 20 } }),
    __metadata("design:type", Number)
], PossibleRentalTypePagingDTO.prototype, "maxSize", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '시작연도' } }),
    __metadata("design:type", String)
], PossibleRentalTypePagingDTO.prototype, "startYear", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '시작 월' } }),
    __metadata("design:type", String)
], PossibleRentalTypePagingDTO.prototype, "startMonth", void 0);
exports.PossibleRentalTypePagingDTO = PossibleRentalTypePagingDTO;
//# sourceMappingURL=possible-rental-type-paging.dto.js.map