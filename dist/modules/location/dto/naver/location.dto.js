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
exports.NaverLocationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const address_dto_1 = require("./address.dto");
const meta_dto_1 = require("./meta.dto");
class NaverLocationDTO {
    constructor(props) {
        this.status = props.status;
        this.meta = new meta_dto_1.NaverMetaDTO(props.meta);
        this.addresses = props.addresses.map((address) => new address_dto_1.NaverAddresssDTO(address));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상태' } }),
    __metadata("design:type", String)
], NaverLocationDTO.prototype, "status", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: meta_dto_1.NaverMetaDTO, description: '메타 데이터' } }),
    __metadata("design:type", meta_dto_1.NaverMetaDTO)
], NaverLocationDTO.prototype, "meta", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: address_dto_1.NaverAddresssDTO, isArray: true, description: '주소 데이터' } }),
    __metadata("design:type", Array)
], NaverLocationDTO.prototype, "addresses", void 0);
exports.NaverLocationDTO = NaverLocationDTO;
//# sourceMappingURL=location.dto.js.map