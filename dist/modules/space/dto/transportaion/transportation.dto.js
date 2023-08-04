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
exports.TransportationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class TransportationDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.timeTaken = props.timeTaken;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: 'id' } }),
    __metadata("design:type", String)
], TransportationDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '역/정류장 이름' } }),
    __metadata("design:type", String)
], TransportationDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '걸리는 시간 (분)' } }),
    __metadata("design:type", Number)
], TransportationDTO.prototype, "timeTaken", void 0);
exports.TransportationDTO = TransportationDTO;
//# sourceMappingURL=transportation.dto.js.map