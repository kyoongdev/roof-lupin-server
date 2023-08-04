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
exports.NaverAddresssDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const address_element_dto_1 = require("./address-element.dto");
class NaverAddresssDTO {
    constructor(props) {
        this.roadAddress = props.roadAddress;
        this.jibunAddress = props.jibunAddress;
        this.englishAddress = props.englishAddress;
        this.longitude = props.x;
        this.latitude = props.y;
        this.distance = props.distance;
        this.addressElements = props.addressElements.map((addressElement) => new address_element_dto_1.NaverAddressElementDTO(addressElement));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '도로명 주소' } }),
    __metadata("design:type", String)
], NaverAddresssDTO.prototype, "roadAddress", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '지번 주소' } }),
    __metadata("design:type", String)
], NaverAddresssDTO.prototype, "jibunAddress", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '영문 도로명 주소' } }),
    __metadata("design:type", String)
], NaverAddresssDTO.prototype, "englishAddress", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '경도(x)' } }),
    __metadata("design:type", String)
], NaverAddresssDTO.prototype, "longitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '위도(y)' } }),
    __metadata("design:type", String)
], NaverAddresssDTO.prototype, "latitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '거리' } }),
    __metadata("design:type", Number)
], NaverAddresssDTO.prototype, "distance", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: address_element_dto_1.NaverAddressElementDTO, isArray: true } }),
    __metadata("design:type", Array)
], NaverAddresssDTO.prototype, "addressElements", void 0);
exports.NaverAddresssDTO = NaverAddresssDTO;
//# sourceMappingURL=address.dto.js.map