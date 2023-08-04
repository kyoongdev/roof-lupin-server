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
exports.ContentCategoryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
class ContentCategoryDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.highlight = props.highlight;
        this.spaces = props.spaces.map((space) => new dto_1.SpaceDTO(space));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카테고리 아이디' } }),
    __metadata("design:type", String)
], ContentCategoryDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카테고리 이름' } }),
    __metadata("design:type", String)
], ContentCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '카테고리 하이라이트 텍스트' } }),
    __metadata("design:type", String)
], ContentCategoryDTO.prototype, "highlight", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.SpaceDTO, isArray: true, description: '카테고리 공간' } }),
    __metadata("design:type", Array)
], ContentCategoryDTO.prototype, "spaces", void 0);
exports.ContentCategoryDTO = ContentCategoryDTO;
//# sourceMappingURL=content-category.dto.js.map