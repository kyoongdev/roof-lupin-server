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
exports.CurationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const curation_space_dto_1 = require("./curation-space.dto");
class CurationDTO {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.subTitle = props.subTitle;
        this.thumbnail = props.thumbnail;
        this.createdAt = props.createdAt;
        this.orderNo = props.orderNo;
        this.updatedAt = props.updatedAt;
        this.spaces = props.spaces.map((space) => new curation_space_dto_1.CurationSpaceDTO(space));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 ID' } }),
    __metadata("design:type", String)
], CurationDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 제목' } }),
    __metadata("design:type", String)
], CurationDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 부제목' } }),
    __metadata("design:type", String)
], CurationDTO.prototype, "subTitle", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 썸네일' } }),
    __metadata("design:type", String)
], CurationDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 생성일' } }),
    __metadata("design:type", Date)
], CurationDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '큐레이션 수정일' } }),
    __metadata("design:type", Date)
], CurationDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: curation_space_dto_1.CurationSpaceDTO, isArray: true, description: '큐레이션 공간' } }),
    __metadata("design:type", Array)
], CurationDTO.prototype, "spaces", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '순서' } }),
    __metadata("design:type", Number)
], CurationDTO.prototype, "orderNo", void 0);
exports.CurationDTO = CurationDTO;
//# sourceMappingURL=curation.dto.js.map