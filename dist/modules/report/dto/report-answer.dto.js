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
exports.ReportAnswerDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../admin/dto");
class ReportAnswerDTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.admin = new dto_1.AdminDTO(props.admin);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 답변 id' } }),
    __metadata("design:type", String)
], ReportAnswerDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 답변 내용' } }),
    __metadata("design:type", String)
], ReportAnswerDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 답변 생성일' } }),
    __metadata("design:type", Date)
], ReportAnswerDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.AdminDTO, description: '신고 답변자' } }),
    __metadata("design:type", dto_1.AdminDTO)
], ReportAnswerDTO.prototype, "admin", void 0);
exports.ReportAnswerDTO = ReportAnswerDTO;
//# sourceMappingURL=report-answer.dto.js.map