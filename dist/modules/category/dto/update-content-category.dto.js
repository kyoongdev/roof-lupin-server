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
exports.UpdateContentCategoryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const update_content_category_space_dto_1 = require("./update-content-category-space.dto");
class UpdateContentCategoryDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.highlight = props.highlight;
            this.spaces = props.spaces.map((space) => new update_content_category_space_dto_1.UpdateContentCategorySpaceDTO(space));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '이름' } }),
    __metadata("design:type", String)
], UpdateContentCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '하이라이트 텍스트' } }),
    __metadata("design:type", String)
], UpdateContentCategoryDTO.prototype, "highlight", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: update_content_category_space_dto_1.UpdateContentCategorySpaceDTO, isArray: true, nullable: true, description: '공간' },
    }),
    __metadata("design:type", Array)
], UpdateContentCategoryDTO.prototype, "spaces", void 0);
exports.UpdateContentCategoryDTO = UpdateContentCategoryDTO;
//# sourceMappingURL=update-content-category.dto.js.map