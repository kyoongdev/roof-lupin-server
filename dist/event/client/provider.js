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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRevalidateEventProvider = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
let ClientRevalidateEventProvider = class ClientRevalidateEventProvider {
    revalidate(payload) {
        axios_1.default.get(payload);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.CLIENT_EVENT_NAME.CLIENT_REVALIDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientRevalidateEventProvider.prototype, "revalidate", null);
ClientRevalidateEventProvider = __decorate([
    (0, common_1.Injectable)()
], ClientRevalidateEventProvider);
exports.ClientRevalidateEventProvider = ClientRevalidateEventProvider;
//# sourceMappingURL=provider.js.map