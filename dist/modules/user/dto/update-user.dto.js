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
exports.UpdateUserDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const gender_validate_1 = require("../../../utils/validation/gender.validate");
class UpdateUserDTO {
    constructor(props) {
        if (props) {
            this.nickname = props.nickname;
            this.email = props.email;
            this.phoneNumber = props.phoneNumber;
            this.birthDay = props.birthDay;
            this.birthYear = props.birthYear;
            this.gender = props.gender;
            this.profileImage = props.profileImage;
            this.pushToken = props.pushToken;
            this.isAdult = props.isAdult;
            this.isAlarmAccepted = props.isAlarmAccepted;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '닉네임', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "nickname", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이메일', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '연락처', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '생년월일', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "birthDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '생년월일', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "birthYear", void 0);
__decorate([
    (0, gender_validate_1.GenderValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '성별', nullable: true } }),
    __metadata("design:type", Number)
], UpdateUserDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '푸시 토큰', nullable: true } }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "pushToken", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '성인 여부', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isAdult", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '알림 수신 여부', nullable: true } }),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "isAlarmAccepted", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=update-user.dto.js.map