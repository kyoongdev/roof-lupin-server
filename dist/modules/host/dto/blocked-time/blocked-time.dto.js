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
exports.BlockedTimeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class BlockedTimeDTO {
    constructor(props) {
        this.id = props.id;
        this.year = props.year;
        this.month = props.month;
        this.day = props.day;
        this.startAt = props.startAt;
        this.endAt = props.endAt;
        this.spaceId = props.spaceId;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 id' } }),
    __metadata("design:type", String)
], BlockedTimeDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 연' } }),
    __metadata("design:type", String)
], BlockedTimeDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 월' } }),
    __metadata("design:type", String)
], BlockedTimeDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '차단된 시간 일' } }),
    __metadata("design:type", String)
], BlockedTimeDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '차단된 시간 시작시간' } }),
    __metadata("design:type", Number)
], BlockedTimeDTO.prototype, "startAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '차단된 시간 끝나는 시간' } }),
    __metadata("design:type", Number)
], BlockedTimeDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 id' } }),
    __metadata("design:type", String)
], BlockedTimeDTO.prototype, "spaceId", void 0);
exports.BlockedTimeDTO = BlockedTimeDTO;
//# sourceMappingURL=blocked-time.dto.js.map