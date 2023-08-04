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
exports.UpdateAnnouncementDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateAnnouncementDTO {
    constructor(props) {
        if (props) {
            Object.assign(this, props);
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공지사항 제목', nullable: true } }),
    __metadata("design:type", String)
], UpdateAnnouncementDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공지사항 내용', nullable: true } }),
    __metadata("design:type", String)
], UpdateAnnouncementDTO.prototype, "content", void 0);
exports.UpdateAnnouncementDTO = UpdateAnnouncementDTO;
//# sourceMappingURL=update-announcement.dto.js.map