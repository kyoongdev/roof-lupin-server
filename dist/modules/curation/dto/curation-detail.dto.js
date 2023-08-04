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
exports.CurationDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../user/dto");
const curation_dto_1 = require("./curation.dto");
class CurationDetailDTO extends curation_dto_1.CurationDTO {
    constructor(props) {
        super(props);
        this.content = props.content;
        this.user = props.user ? new dto_1.CommonUserDTO(props.user) : null;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '큐레이션 내용' } }),
    __metadata("design:type", String)
], CurationDetailDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, nullable: true, description: '큐레이션 작성자' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], CurationDetailDTO.prototype, "user", void 0);
exports.CurationDetailDTO = CurationDetailDTO;
//# sourceMappingURL=curation-detail.dto.js.map