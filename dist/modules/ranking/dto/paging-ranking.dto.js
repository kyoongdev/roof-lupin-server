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
exports.PagingRankingDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
class PagingRankingDTO {
    constructor(props) {
        this.data = props.spaces;
        this.paging = new cumuco_nestjs_1.PagingMetaDTO(props.paging);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.SpaceDTO, isArray: true, description: '랭킹' } }),
    __metadata("design:type", Array)
], PagingRankingDTO.prototype, "data", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: cumuco_nestjs_1.PagingMetaDTO, description: '페이징 메타' } }),
    __metadata("design:type", cumuco_nestjs_1.PagingMetaDTO)
], PagingRankingDTO.prototype, "paging", void 0);
exports.PagingRankingDTO = PagingRankingDTO;
//# sourceMappingURL=paging-ranking.dto.js.map