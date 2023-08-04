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
exports.ReportDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
const report_answer_dto_1 = require("./report-answer.dto");
const report_dto_1 = require("./report.dto");
class ReportDetailDTO extends report_dto_1.ReportDTO {
    constructor(props) {
        super(props);
        this.space = new dto_1.SpaceDTO(props.space);
        this.answer = props.answer ? new report_answer_dto_1.ReportAnswerDTO(props.answer) : null;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.SpaceDTO, description: '신고된 공간' } }),
    __metadata("design:type", dto_1.SpaceDTO)
], ReportDetailDTO.prototype, "space", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: report_answer_dto_1.ReportAnswerDTO, nullable: true, description: '신고 답변' } }),
    __metadata("design:type", report_answer_dto_1.ReportAnswerDTO)
], ReportDetailDTO.prototype, "answer", void 0);
exports.ReportDetailDTO = ReportDetailDTO;
//# sourceMappingURL=report-detail.dto.js.map