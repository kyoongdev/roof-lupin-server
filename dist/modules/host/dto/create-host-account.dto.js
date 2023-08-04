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
exports.CreateHostAccountDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
class CreateHostAccountDTO {
    constructor(props) {
        if (props) {
            this.ownerName = props.ownerName;
            this.bankCode = props.bankCode;
            this.businessRegistrationNumber = props.businessRegistrationNumber;
            this.account = props.account;
            this.accountOwner = props.accountOwner;
            this.accountType = props.accountType;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '사업자 유형' } }),
    __metadata("design:type", Number)
], CreateHostAccountDTO.prototype, "accountType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '사업주 이름' } }),
    __metadata("design:type", String)
], CreateHostAccountDTO.prototype, "ownerName", void 0);
__decorate([
    (0, validation_1.BankCodeReqDecorator)(),
    __metadata("design:type", String)
], CreateHostAccountDTO.prototype, "bankCode", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '사업자등록번호' } }),
    __metadata("design:type", String)
], CreateHostAccountDTO.prototype, "businessRegistrationNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '계좌번호' } }),
    __metadata("design:type", String)
], CreateHostAccountDTO.prototype, "account", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '계좌 소유자 이름' } }),
    __metadata("design:type", String)
], CreateHostAccountDTO.prototype, "accountOwner", void 0);
exports.CreateHostAccountDTO = CreateHostAccountDTO;
//# sourceMappingURL=create-host-account.dto.js.map