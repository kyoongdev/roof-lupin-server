"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmModule = void 0;
const common_1 = require("@nestjs/common");
const fcm_1 = require("../../event/fcm");
const user_repository_1 = require("../user/user.repository");
const alarm_controller_1 = require("./alarm.controller");
const alarm_repository_1 = require("./alarm.repository");
const alarm_service_1 = require("./alarm.service");
let AlarmModule = class AlarmModule {
};
AlarmModule = __decorate([
    (0, common_1.Module)({
        controllers: [alarm_controller_1.AlarmController],
        providers: [alarm_service_1.AlarmService, alarm_repository_1.AlarmRepository, fcm_1.FCMEvent, user_repository_1.UserRepository],
    })
], AlarmModule);
exports.AlarmModule = AlarmModule;
//# sourceMappingURL=alarm.module.js.map