"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const encrypt_1 = require("../../common/encrypt");
const fcm_1 = require("../../event/fcm");
const admin_repository_1 = require("../admin/admin.repository");
const host_repository_1 = require("../host/host.repository");
const user_repository_1 = require("../user/user.repository");
const jwt_1 = require("../../utils/jwt");
const coupon_repository_1 = require("../coupon/coupon.repository");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const config = new config_1.ConfigService();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cumuco_nestjs_1.SocialLoginModule.forRoot({
                kakao: {
                    adminKey: config.get('KAKAO_ADMIN_KEY'),
                    redirectUrl: config.get('KAKAO_REDIRECT_URL'),
                    restKey: config.get('KAKAO_REST_KEY'),
                    secretKey: config.get('KAKAO_SECRET_KEY'),
                },
                naver: {
                    clientId: config.get('NAVER_CLIENT_ID'),
                    clientSecret: config.get('NAVER_CLIENT_SECRET'),
                    redirectUrl: config.get('NAVER_REDIRECT_URL'),
                },
                apple: {
                    appleConfig: {
                        client_id: config.get('APPLE_CLIENT_ID'),
                        key_id: config.get('APPLE_KEY_ID'),
                        redirect_uri: config.get('APPLE_REDIRECT_URL'),
                        scope: 'name email',
                        team_id: config.get('APPLE_TEAM_ID'),
                    },
                    path: '../../config/appleAuthKey.p8',
                },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            user_repository_1.UserRepository,
            admin_repository_1.AdminRepository,
            host_repository_1.HostRepository,
            jwt_1.Jsonwebtoken,
            coupon_repository_1.CouponRepository,
            encrypt_1.EncryptProvider,
            fcm_1.FCMEvent,
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map