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
exports.SpaceCategoryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class SpaceCategoryDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.iconPath = props.iconPath;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카테고리 id' } }),
    __metadata("design:type", String)
], SpaceCategoryDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카테고리 이름' } }),
    __metadata("design:type", String)
], SpaceCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카테고리 아이콘 경로' } }),
    __metadata("design:type", String)
], SpaceCategoryDTO.prototype, "iconPath", void 0);
exports.SpaceCategoryDTO = SpaceCategoryDTO;
//# sourceMappingURL=category.dto.js.map