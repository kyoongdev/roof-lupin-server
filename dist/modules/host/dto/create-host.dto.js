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
exports.CreateHostDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
class CreateHostDTO {
    constructor(props) {
        if (props) {
            Object.assign(this, props);
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이름' } }),
    __metadata("design:type", String)
], CreateHostDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이메일' } }),
    __metadata("design:type", String)
], CreateHostDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '프로필 이미지', nullable: true } }),
    __metadata("design:type", String)
], CreateHostDTO.prototype, "profileImage", void 0);
__decorate([
    (0, validation_1.PhoneNumberValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 아이디' } }),
    __metadata("design:type", String)
], CreateHostDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, validation_1.GenderReqDecorators)(),
    __metadata("design:type", Number)
], CreateHostDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '비밀번호' } }),
    __metadata("design:type", String)
], CreateHostDTO.prototype, "password", void 0);
exports.CreateHostDTO = CreateHostDTO;
//# sourceMappingURL=create-host.dto.js.map