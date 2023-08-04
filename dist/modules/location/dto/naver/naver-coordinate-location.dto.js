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
exports.NaverCoordinateLocationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class NaverCoordinateLocationDTO {
    constructor(props) {
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.address = props.address;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '위도' } }),
    __metadata("design:type", String)
], NaverCoordinateLocationDTO.prototype, "latitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '경도' } }),
    __metadata("design:type", String)
], NaverCoordinateLocationDTO.prototype, "longitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '주소' } }),
    __metadata("design:type", String)
], NaverCoordinateLocationDTO.prototype, "address", void 0);
exports.NaverCoordinateLocationDTO = NaverCoordinateLocationDTO;
//# sourceMappingURL=naver-coordinate-location.dto.js.map