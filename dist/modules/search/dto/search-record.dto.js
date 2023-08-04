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
exports.SearchRecordDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class SearchRecordDTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.userId = props.userId;
        this.createdAt = props.createdAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'search record id' } }),
    __metadata("design:type", String)
], SearchRecordDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '검색어' } }),
    __metadata("design:type", String)
], SearchRecordDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '작성자 ID' } }),
    __metadata("design:type", String)
], SearchRecordDTO.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '검색일자' } }),
    __metadata("design:type", Date)
], SearchRecordDTO.prototype, "createdAt", void 0);
exports.SearchRecordDTO = SearchRecordDTO;
//# sourceMappingURL=search-record.dto.js.map