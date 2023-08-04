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
exports.HostDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const base_host_dto_1 = require("./base-host.dto");
class HostDTO extends base_host_dto_1.BaseHostDTO {
    constructor(props) {
        super();
        this.id = props.id;
        this.email = props.email;
        this.name = props.name;
        this.profileImage = props.profileImage;
        this.phoneNumber = props.phoneNumber;
        this.gender = this.hostGenderConverter(props.gender);
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'host ID' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 아이디' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '호스트 이름' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '호스트 프로필 이미지' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "profileImage", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '연락처' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '남성 | 여성' } }),
    __metadata("design:type", String)
], HostDTO.prototype, "gender", void 0);
exports.HostDTO = HostDTO;
//# sourceMappingURL=host.dto.js.map