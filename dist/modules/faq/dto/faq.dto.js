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
exports.FAQDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../user/dto");
class FAQDTO {
    constructor(props) {
        this.id = props.id;
        this.question = props.question;
        this.answer = props.answer;
        this.user = props.user ? new dto_1.CommonUserDTO(props.user) : null;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'faq id' } }),
    __metadata("design:type", String)
], FAQDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '질문' } }),
    __metadata("design:type", String)
], FAQDTO.prototype, "question", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '답변' } }),
    __metadata("design:type", String)
], FAQDTO.prototype, "answer", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, nullable: true, description: '유저' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], FAQDTO.prototype, "user", void 0);
exports.FAQDTO = FAQDTO;
//# sourceMappingURL=faq.dto.js.map