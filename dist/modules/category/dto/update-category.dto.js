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
exports.UpdateCategoryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateCategoryDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.iconPath = props.iconPath;
            this.isHome = props.isHome;
            this.isRecommended = props.isRecommended;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '카테고리 이름' } }),
    __metadata("design:type", String)
], UpdateCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', nullable: true, description: '아이콘 경로, 홈 카테고리라면 아이콘 필수' },
    }),
    __metadata("design:type", String)
], UpdateCategoryDTO.prototype, "iconPath", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '홈 카테고리 여부' } }),
    __metadata("design:type", Boolean)
], UpdateCategoryDTO.prototype, "isHome", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '추천 여부' } }),
    __metadata("design:type", Boolean)
], UpdateCategoryDTO.prototype, "isRecommended", void 0);
exports.UpdateCategoryDTO = UpdateCategoryDTO;
//# sourceMappingURL=update-category.dto.js.map