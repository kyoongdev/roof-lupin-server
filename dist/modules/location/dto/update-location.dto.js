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
exports.UpdateLocationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateLocationDTO {
    constructor(props) {
        if (props) {
            this.lat = props.lat;
            this.lng = props.lng;
            this.roadAddress = props.roadAddress;
            this.jibunAddress = props.jibunAddress;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '위도' } }),
    __metadata("design:type", String)
], UpdateLocationDTO.prototype, "lat", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '경도' } }),
    __metadata("design:type", String)
], UpdateLocationDTO.prototype, "lng", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '도로명 주소' } }),
    __metadata("design:type", String)
], UpdateLocationDTO.prototype, "roadAddress", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '지번 주소' } }),
    __metadata("design:type", String)
], UpdateLocationDTO.prototype, "jibunAddress", void 0);
exports.UpdateLocationDTO = UpdateLocationDTO;
//# sourceMappingURL=update-location.dto.js.map