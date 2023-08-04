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
exports.UpdateHostDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
class UpdateHostDTO {
    constructor(props) {
        if (props) {
            Object.assign(this, props);
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이름', nullable: true } }),
    __metadata("design:type", String)
], UpdateHostDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이메일', nullable: true } }),
    __metadata("design:type", String)
], UpdateHostDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '프로필 이미지', nullable: true } }),
    __metadata("design:type", String)
], UpdateHostDTO.prototype, "profileImage", void 0);
__decorate([
    (0, validation_1.PhoneNumberValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 아이디', nullable: true } }),
    __metadata("design:type", String)
], UpdateHostDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, validation_1.GenderReqDecorators)(true),
    __metadata("design:type", Number)
], UpdateHostDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '비밀번호', nullable: true } }),
    __metadata("design:type", String)
], UpdateHostDTO.prototype, "password", void 0);
exports.UpdateHostDTO = UpdateHostDTO;
//# sourceMappingURL=update-host.dto.js.map