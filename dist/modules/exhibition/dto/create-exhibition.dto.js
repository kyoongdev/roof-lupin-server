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
exports.CreateExhibitionDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const create_exhibition_space_dto_1 = require("./create-exhibition-space.dto");
class CreateExhibitionDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.thumbnail = props.thumbnail;
            this.description = props.description;
            this.content = props.content;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
            this.isShow = props.isShow;
            this.images = props.images;
            this.spaces = props.spaces.map((space) => new create_exhibition_space_dto_1.CreateExhibitionSpaceDTO(space));
            this.couponIds = props.couponIds;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 제목' } }),
    __metadata("design:type", String)
], CreateExhibitionDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 썸네일' } }),
    __metadata("design:type", String)
], CreateExhibitionDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 부가 설명' } }),
    __metadata("design:type", String)
], CreateExhibitionDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 내용' } }),
    __metadata("design:type", String)
], CreateExhibitionDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 시작날짜' } }),
    __metadata("design:type", Date)
], CreateExhibitionDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 종료날짜' } }),
    __metadata("design:type", Date)
], CreateExhibitionDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '기획전 노출 여부' } }),
    __metadata("design:type", Boolean)
], CreateExhibitionDTO.prototype, "isShow", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 이미지 url들' } }),
    __metadata("design:type", Array)
], CreateExhibitionDTO.prototype, "images", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: create_exhibition_space_dto_1.CreateExhibitionSpaceDTO, isArray: true, description: '기획전 연관 공간 id들' } }),
    __metadata("design:type", Array)
], CreateExhibitionDTO.prototype, "spaces", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 쿠폰 id들' } }),
    __metadata("design:type", Array)
], CreateExhibitionDTO.prototype, "couponIds", void 0);
exports.CreateExhibitionDTO = CreateExhibitionDTO;
//# sourceMappingURL=create-exhibition.dto.js.map