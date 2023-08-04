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
exports.CreateHomeContentsDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class CreateHomeContentsDTO {
    constructor(props) {
        if (props) {
            this.contentCategoryId = props.contentCategoryId;
            this.exhibitionId = props.exhibitionId;
            this.rankingId = props.rankingId;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '컨텐츠 카테고리 id' } }),
    __metadata("design:type", String)
], CreateHomeContentsDTO.prototype, "contentCategoryId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } }),
    __metadata("design:type", String)
], CreateHomeContentsDTO.prototype, "exhibitionId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '랭킹 id' } }),
    __metadata("design:type", String)
], CreateHomeContentsDTO.prototype, "rankingId", void 0);
exports.CreateHomeContentsDTO = CreateHomeContentsDTO;
//# sourceMappingURL=create-home-contents.dto.js.map