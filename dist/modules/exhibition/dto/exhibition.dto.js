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
exports.ExhibitionDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class ExhibitionDTO {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.thumbnail = props.thumbnail;
        this.description = props.description;
        this.content = props.content;
        this.startAt = props.startAt;
        this.endAt = props.endAt;
        this.createdAt = props.createdAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 id' } }),
    __metadata("design:type", String)
], ExhibitionDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 제목' } }),
    __metadata("design:type", String)
], ExhibitionDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 썸네일' } }),
    __metadata("design:type", String)
], ExhibitionDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 부가설명' } }),
    __metadata("design:type", String)
], ExhibitionDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 내용' } }),
    __metadata("design:type", String)
], ExhibitionDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 시작' } }),
    __metadata("design:type", Date)
], ExhibitionDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 끝' } }),
    __metadata("design:type", Date)
], ExhibitionDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '기획전 생성일' } }),
    __metadata("design:type", Date)
], ExhibitionDTO.prototype, "createdAt", void 0);
exports.ExhibitionDTO = ExhibitionDTO;
//# sourceMappingURL=exhibition.dto.js.map