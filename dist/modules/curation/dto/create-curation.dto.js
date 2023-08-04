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
exports.CreateCurationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const create_curation_space_dto_1 = require("./create-curation-space.dto");
class CreateCurationDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.subTitle = props.subTitle;
            this.content = props.content;
            this.thumbnail = props.thumbnail;
            this.spaces = props.spaces?.map((space) => new create_curation_space_dto_1.CreateCurationSpaceDTO(space));
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 제목' } }),
    __metadata("design:type", String)
], CreateCurationDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 부제목' } }),
    __metadata("design:type", String)
], CreateCurationDTO.prototype, "subTitle", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 내용' } }),
    __metadata("design:type", String)
], CreateCurationDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 썸네일' } }),
    __metadata("design:type", String)
], CreateCurationDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: create_curation_space_dto_1.CreateCurationSpaceDTO, isArray: true, nullable: true, description: '공간 ids' } }),
    __metadata("design:type", Array)
], CreateCurationDTO.prototype, "spaces", void 0);
exports.CreateCurationDTO = CreateCurationDTO;
//# sourceMappingURL=create-curation.dto.js.map