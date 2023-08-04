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
exports.FindUsersQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class FindUsersQuery extends cumuco_nestjs_1.PagingDTO {
    generateQuery() {
        return {
            where: {
                ...(this.nickname && {
                    nickname: {
                        contains: this.nickname,
                    },
                }),
                ...(this.email && {
                    email: {
                        contains: this.email,
                    },
                }),
            },
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '닉네임' } }),
    __metadata("design:type", String)
], FindUsersQuery.prototype, "nickname", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '이메일' } }),
    __metadata("design:type", String)
], FindUsersQuery.prototype, "email", void 0);
exports.FindUsersQuery = FindUsersQuery;
//# sourceMappingURL=find-users.query.js.map