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
exports.ReportDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_1 = require("../../../common");
const dto_1 = require("../../user/dto");
class ReportDTO extends common_1.DateDTO {
    constructor(props) {
        super();
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.user = new dto_1.CommonUserDTO(props.user);
        this.isAnswered = props.isAnswered;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 ID' } }),
    __metadata("design:type", String)
], ReportDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 제목' } }),
    __metadata("design:type", String)
], ReportDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 내용' } }),
    __metadata("design:type", String)
], ReportDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, description: '신고자' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], ReportDTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '답변 여부' } }),
    __metadata("design:type", Boolean)
], ReportDTO.prototype, "isAnswered", void 0);
exports.ReportDTO = ReportDTO;
//# sourceMappingURL=report.dto.js.map