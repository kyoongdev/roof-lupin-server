"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const location_controller_1 = require("./location.controller");
const location_repository_1 = require("./location.repository");
const location_service_1 = require("./location.service");
const config = new config_1.ConfigService();
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cumuco_nestjs_1.SocialLocationModule.forRoot({
                kakaoRestKey: config.get('KAKAO_REST_KEY'),
                naver: {
                    clientId: config.get('NAVER_CONSOLE_CLIENT_ID'),
                    clientSecret: config.get('NAVER_CONSOLE_CLIENT_SECRET'),
                },
            }),
        ],
        providers: [location_repository_1.LocationRepository, location_service_1.LocationService],
        controllers: [location_controller_1.LocationController],
    })
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map