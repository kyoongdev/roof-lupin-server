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
exports.UpdateAdditionalServiceDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateAdditionalServiceDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.cost = props.cost;
            this.description = props.description;
            this.tooltip = props.tooltip;
            this.maxCount = props.maxCount;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '추가 서비스 이름' } }),
    __metadata("design:type", String)
], UpdateAdditionalServiceDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '추가 서비스 가격' } }),
    __metadata("design:type", Number)
], UpdateAdditionalServiceDTO.prototype, "cost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '추가 서비스 설명' } }),
    __metadata("design:type", String)
], UpdateAdditionalServiceDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '추가 서비스 툴팁' } }),
    __metadata("design:type", String)
], UpdateAdditionalServiceDTO.prototype, "tooltip", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '추가 서비스 최대 개수' } }),
    __metadata("design:type", Number)
], UpdateAdditionalServiceDTO.prototype, "maxCount", void 0);
exports.UpdateAdditionalServiceDTO = UpdateAdditionalServiceDTO;
//# sourceMappingURL=update-additional-service.dto.js.map