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
exports.CreateContentCategoryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const create_content_category_space_dto_1 = require("./create-content-category-space.dto");
class CreateContentCategoryDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.highlight = props.highlight;
            this.spaces = props.spaces.map((space) => new create_content_category_space_dto_1.CreateContentCategorySpaceDTO(space));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이름' } }),
    __metadata("design:type", String)
], CreateContentCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '하이라이트 텍스트' } }),
    __metadata("design:type", String)
], CreateContentCategoryDTO.prototype, "highlight", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: create_content_category_space_dto_1.CreateContentCategorySpaceDTO, isArray: true, description: '공간' } }),
    __metadata("design:type", Array)
], CreateContentCategoryDTO.prototype, "spaces", void 0);
exports.CreateContentCategoryDTO = CreateContentCategoryDTO;
//# sourceMappingURL=create-content-category.dto.js.map