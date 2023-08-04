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
exports.ReviewAnswerDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../host/dto");
class ReviewAnswerDTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.host = new dto_1.HostDTO(props.host);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '답변 아이디' } }),
    __metadata("design:type", String)
], ReviewAnswerDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '답변 내용' } }),
    __metadata("design:type", String)
], ReviewAnswerDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '생성 일자' } }),
    __metadata("design:type", Date)
], ReviewAnswerDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.HostDTO, description: '답변자' } }),
    __metadata("design:type", dto_1.HostDTO)
], ReviewAnswerDTO.prototype, "host", void 0);
exports.ReviewAnswerDTO = ReviewAnswerDTO;
//# sourceMappingURL=review-answer.dto.js.map