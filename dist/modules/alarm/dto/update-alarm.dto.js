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
exports.UpdateAlarmDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateAlarmDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.content = props.content;
            this.link = props.link;
            this.alarmAt = props.alarmAt;
            this.isRead = props.isRead;
            this.isPush = props.isPush;
            this.isPushed = props.isPushed;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 제목' } }),
    __metadata("design:type", String)
], UpdateAlarmDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 내용' } }),
    __metadata("design:type", String)
], UpdateAlarmDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 링크' } }),
    __metadata("design:type", String)
], UpdateAlarmDTO.prototype, "link", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '알람 시간' } }),
    __metadata("design:type", Date)
], UpdateAlarmDTO.prototype, "alarmAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '읽음 여부' } }),
    __metadata("design:type", Boolean)
], UpdateAlarmDTO.prototype, "isRead", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 여부' } }),
    __metadata("design:type", Boolean)
], UpdateAlarmDTO.prototype, "isPush", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '푸시 전송 여부' } }),
    __metadata("design:type", Boolean)
], UpdateAlarmDTO.prototype, "isPushed", void 0);
exports.UpdateAlarmDTO = UpdateAlarmDTO;
//# sourceMappingURL=update-alarm.dto.js.map