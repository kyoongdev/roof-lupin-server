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
exports.AdminUserDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const user_interface_1 = require("../../../../interface/user.interface");
const dto_1 = require("../../../user/dto");
class AdminUserDTO extends dto_1.CommonUserDTO {
    constructor(props) {
        super(props);
        this.isBlocked = props.isBlocked;
        this.unBlockAT = props.unBlockAt;
        this.loginedAt = props.loginedAt;
        this.socialType = props.socialType;
        this.pushToken = props.pushToken;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '차단 여부' } }),
    __metadata("design:type", Boolean)
], AdminUserDTO.prototype, "isBlocked", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '차단 해제일' } }),
    __metadata("design:type", Date)
], AdminUserDTO.prototype, "unBlockAT", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '차단 여부' } }),
    __metadata("design:type", Date)
], AdminUserDTO.prototype, "loginedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', example: Object.keys(user_interface_1.SOCIAL_TYPE).join(','), description: '소셜 종류' } }),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "socialType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '푸시 토큰' } }),
    __metadata("design:type", String)
], AdminUserDTO.prototype, "pushToken", void 0);
exports.AdminUserDTO = AdminUserDTO;
//# sourceMappingURL=user.dto.js.map