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
exports.CommonUserDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
const base_user_dto_1 = require("./base-user.dto");
class CommonUserDTO extends base_user_dto_1.BaseUserDTO {
    constructor(props) {
        super();
        this.id = props.id;
        this.name = props.name;
        this.nickname = props.nickname;
        this.email = props.email ?? null;
        this.phoneNumber = props.phoneNumber ?? null;
        this.birthYear = props.birthYear ?? null;
        this.birthDay = props.birthDay ?? null;
        this.gender = props.gender;
        this.profileImage = props.profileImage ?? null;
        this.isAdult = props.isAdult;
        this.isAlarmAccepted = props.isAlarmAccepted;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '이름' } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "nickname", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '-을 제외한 11자리 입니다.' } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "birthDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "birthYear", void 0);
__decorate([
    (0, validation_1.GenderResTransForm)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, example: validation_1.GENDER_VALUE.join(',') + ',NULL' } }),
    __metadata("design:type", Number)
], CommonUserDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], CommonUserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '성인 인증 여부' } }),
    __metadata("design:type", Boolean)
], CommonUserDTO.prototype, "isAdult", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '알림 승인 여부' } }),
    __metadata("design:type", Boolean)
], CommonUserDTO.prototype, "isAlarmAccepted", void 0);
exports.CommonUserDTO = CommonUserDTO;
//# sourceMappingURL=common-user.dto.js.map