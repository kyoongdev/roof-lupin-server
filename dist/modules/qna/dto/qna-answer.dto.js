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
exports.QnAAnswerDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_1 = require("../../../common");
const host_dto_1 = require("../../host/dto/host.dto");
class QnAAnswerDTO extends common_1.DateDTO {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.content = props.content;
        this.qnaId = props.spaceQnAId;
        this.host = new host_dto_1.HostDTO(props.host);
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '답변 ID' } }),
    __metadata("design:type", String)
], QnAAnswerDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '답변 내용' } }),
    __metadata("design:type", String)
], QnAAnswerDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'qna ID' } }),
    __metadata("design:type", String)
], QnAAnswerDTO.prototype, "qnaId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: host_dto_1.HostDTO, description: '호스트' } }),
    __metadata("design:type", host_dto_1.HostDTO)
], QnAAnswerDTO.prototype, "host", void 0);
exports.QnAAnswerDTO = QnAAnswerDTO;
//# sourceMappingURL=qna-answer.dto.js.map