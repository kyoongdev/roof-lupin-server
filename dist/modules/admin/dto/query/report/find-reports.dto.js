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
exports.AdminFindReportsQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class AdminFindReportsQuery extends cumuco_nestjs_1.PagingDTO {
    generateQuery() {
        return {
            where: {
                ...(this.userId && {
                    userId: this.userId,
                }),
                ...(this.userName && {
                    user: {
                        name: {
                            contains: this.userName,
                        },
                    },
                }),
                ...(this.spaceName && {
                    space: {
                        title: {
                            contains: this.spaceName,
                        },
                    },
                }),
                ...(typeof this.isAnswered === 'boolean' && {
                    answer: this.isAnswered ? { NOT: null } : null,
                }),
            },
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } }),
    __metadata("design:type", String)
], AdminFindReportsQuery.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } }),
    __metadata("design:type", String)
], AdminFindReportsQuery.prototype, "userName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } }),
    __metadata("design:type", String)
], AdminFindReportsQuery.prototype, "spaceName", void 0);
__decorate([
    (0, cumuco_nestjs_1.ToBoolean)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '답변 여부' } }),
    __metadata("design:type", Boolean)
], AdminFindReportsQuery.prototype, "isAnswered", void 0);
exports.AdminFindReportsQuery = AdminFindReportsQuery;
//# sourceMappingURL=find-reports.dto.js.map