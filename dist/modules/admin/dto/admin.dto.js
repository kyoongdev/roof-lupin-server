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
exports.AdminDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_1 = require("../../../common");
class AdminDTO extends common_1.DateDTO {
    constructor(props) {
        super();
        this.id = props.id;
        this.name = props.name;
        this.userId = props.userId;
        this.isAccepted = props.isAccepted;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'id' } }),
    __metadata("design:type", String)
], AdminDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이름' } }),
    __metadata("design:type", String)
], AdminDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '아이디' } }),
    __metadata("design:type", String)
], AdminDTO.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '승인 여부' } }),
    __metadata("design:type", Boolean)
], AdminDTO.prototype, "isAccepted", void 0);
exports.AdminDTO = AdminDTO;
//# sourceMappingURL=admin.dto.js.map