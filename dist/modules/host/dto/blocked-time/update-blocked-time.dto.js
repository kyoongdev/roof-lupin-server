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
exports.UpdateBlockedTimeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateBlockedTimeDTO {
    constructor(props) {
        if (props) {
            this.year = props.year;
            this.month = props.month;
            this.day = props.day;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 연' } }),
    __metadata("design:type", String)
], UpdateBlockedTimeDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 월' } }),
    __metadata("design:type", String)
], UpdateBlockedTimeDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 일' } }),
    __metadata("design:type", String)
], UpdateBlockedTimeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '차단된 시간 시작시간' } }),
    __metadata("design:type", Number)
], UpdateBlockedTimeDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '차단된 시간 끝나는 시간' } }),
    __metadata("design:type", Number)
], UpdateBlockedTimeDTO.prototype, "endAt", void 0);
exports.UpdateBlockedTimeDTO = UpdateBlockedTimeDTO;
//# sourceMappingURL=update-blocked-time.dto.js.map