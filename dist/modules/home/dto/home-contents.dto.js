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
exports.HomeContentsDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../category/dto");
const dto_2 = require("../../exhibition/dto");
const dto_3 = require("../../ranking/dto");
class HomeContentsDTO {
    constructor(props) {
        this.id = props.id;
        this.type = this.getContentType(props);
        this.contentCategory = props.contentsCategory ? new dto_1.ContentCategoryDTO(props.contentsCategory) : undefined;
        this.exhibition = props.exhibition ? new dto_2.ExhibitionDTO(props.exhibition) : undefined;
        this.ranking = props.ranking ? new dto_3.RankingDTO(props.ranking) : undefined;
    }
    getContentType(props) {
        if (props.contentsCategory) {
            return 'CONTENTS';
        }
        else if (props.exhibition) {
            return 'EXHIBITION';
        }
        else
            return 'RANKING';
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '홈 컨텐츠 id' } }),
    __metadata("design:type", String)
], HomeContentsDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', description: '홈 컨텐츠 종류', example: 'CONTENTS | EXHIBITION | RANKING' },
    }),
    __metadata("design:type", String)
], HomeContentsDTO.prototype, "type", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.ContentCategoryDTO, nullable: true, description: '컨텐츠' } }),
    __metadata("design:type", dto_1.ContentCategoryDTO)
], HomeContentsDTO.prototype, "contentCategory", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.ExhibitionDTO, nullable: true, description: '기획전' } }),
    __metadata("design:type", dto_2.ExhibitionDTO)
], HomeContentsDTO.prototype, "exhibition", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_3.RankingDTO, nullable: true, description: '랭킹' } }),
    __metadata("design:type", dto_3.RankingDTO)
], HomeContentsDTO.prototype, "ranking", void 0);
exports.HomeContentsDTO = HomeContentsDTO;
//# sourceMappingURL=home-contents.dto.js.map