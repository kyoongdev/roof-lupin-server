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
exports.SendMessageDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const fcm_message_dto_1 = require("./fcm-message.dto");
class SendMessageDTO {
    constructor(props) {
        if (props) {
            this.userId = props.userId;
            this.message = new fcm_message_dto_1.FCMMessageDTO(props.message);
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 아이디' } }),
    __metadata("design:type", String)
], SendMessageDTO.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: fcm_message_dto_1.FCMMessageDTO, description: 'FCM 메시지' } }),
    __metadata("design:type", fcm_message_dto_1.FCMMessageDTO)
], SendMessageDTO.prototype, "message", void 0);
exports.SendMessageDTO = SendMessageDTO;
//# sourceMappingURL=send-message.dto.js.map