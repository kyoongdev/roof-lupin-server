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
exports.CreateAlarmDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class CreateAlarmDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.content = props.content;
            this.link = props.link;
            this.alarmAt = props.alarmAt;
            this.isPush = props.isPush;
            this.userId = props.userId;
            this.spaceId = props.spaceId;
            this.exhibitionId = props.exhibitionId;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '알람 제목' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '알람 내용' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 링크' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "link", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 시간' } }),
    __metadata("design:type", Date)
], CreateAlarmDTO.prototype, "alarmAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 여부' } }),
    __metadata("design:type", Boolean)
], CreateAlarmDTO.prototype, "isPush", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "spaceId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } }),
    __metadata("design:type", String)
], CreateAlarmDTO.prototype, "exhibitionId", void 0);
exports.CreateAlarmDTO = CreateAlarmDTO;
//# sourceMappingURL=create-alarm.dto.js.map