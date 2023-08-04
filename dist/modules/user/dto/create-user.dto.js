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
exports.CreateUserDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const gender_validate_1 = require("../../../utils/validation/gender.validate");
class CreateUserDTO {
    constructor(props) {
        if (props) {
            this.nickname = props.nickname;
            this.email = props.email;
            this.phoneNumber = props.phoneNumber;
            this.birthDay = props.birthDay;
            this.birthYear = props.birthYear;
            this.gender = props.gender;
            this.profileImage = props.profileImage;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "nickname", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, maxLength: 11 } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "birthDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "birthYear", void 0);
__decorate([
    (0, gender_validate_1.GenderReqDecorators)(true),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true } }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "profileImage", void 0);
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=create-user.dto.js.map