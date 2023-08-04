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
exports.QnADTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../space/dto");
const dto_2 = require("../../user/dto");
const qna_answer_dto_1 = require("./qna-answer.dto");
class QnADTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.user = new dto_2.CommonUserDTO(props.user);
        this.answers = props.answers.map((answer) => new qna_answer_dto_1.QnAAnswerDTO(answer));
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.space = new dto_1.SpaceDTO(props.space);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'QnA ID' } }),
    __metadata("design:type", String)
], QnADTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '내용' } }),
    __metadata("design:type", String)
], QnADTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.CommonUserDTO, description: '유저' } }),
    __metadata("design:type", dto_2.CommonUserDTO)
], QnADTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: qna_answer_dto_1.QnAAnswerDTO, description: '답변', isArray: true } }),
    __metadata("design:type", Array)
], QnADTO.prototype, "answers", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], QnADTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], QnADTO.prototype, "updatedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.SpaceDTO, description: '공간' } }),
    __metadata("design:type", dto_1.SpaceDTO)
], QnADTO.prototype, "space", void 0);
exports.QnADTO = QnADTO;
//# sourceMappingURL=qna.dto.js.map