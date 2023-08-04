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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const nanoid_1 = require("nanoid");
const utils_1 = require("../../utils");
const create_admin_dto_1 = require("../admin/dto/create-admin.dto");
const dto_1 = require("../host/dto");
const auth_service_1 = require("./auth.service");
const dto_2 = require("./dto");
const query_1 = require("./dto/query");
let AuthController = class AuthController {
    constructor(authService, kakaoService, naverService, appleService) {
        this.authService = authService;
        this.kakaoService = kakaoService;
        this.naverService = naverService;
        this.appleService = appleService;
    }
    async test() {
        return await this.authService.testUserLogin();
    }
    kakaoLogin(res) {
        this.kakaoService.getRest(res);
    }
    async kakaoLoginCallback(code, res) {
        await this.authService.kakaoLoginCallback(code, res);
    }
    async getKakaoUser(query) {
        return await this.authService.getKakaoUser(query.token);
    }
    naverLogin(res) {
        const code = (0, nanoid_1.nanoid)(5);
        this.naverService.getRest(res, code);
    }
    async naverLoginCallback(code, res) {
        await this.authService.naverLoginCallback(code, res);
    }
    appleLogin(res) {
        this.appleService.getRest(res);
    }
    async appleLoginCallback(body, res) {
        await this.authService.appleLoginCallback(body.id_token, res);
    }
    async refresh(body) {
        return await this.authService.refresh(body);
    }
    async adminLogin(body) {
        return await this.authService.adminLogin(body);
    }
    async adminRegister(body) {
        return await this.authService.adminRegister(body);
    }
    async hostLogin(body) {
        return await this.authService.hostLogin(body);
    }
    async hostRegister(body) {
        return await this.authService.hostRegister(body);
    }
    async refreshToken(body) {
        return await this.authService.refresh(body);
    }
};
__decorate([
    (0, common_1.Get)('test'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '테스트 로그인',
            summary: '테스트 로그인입니다. 개발 환경에서만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('social/kakao'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '카카오 로그인',
            summary: '카카오 로그인',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('social/kakao/callback'),
    (0, cumuco_nestjs_1.RequestApi)({}),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoLoginCallback", null);
__decorate([
    (0, common_1.Get)('social/kakao/user'),
    (0, cumuco_nestjs_1.RequestApi)({}),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.KakaoSocialUserQuery]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getKakaoUser", null);
__decorate([
    (0, common_1.Get)('social/naver'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '네이버 로그인',
            summary: '네이버 로그인',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "naverLogin", null);
__decorate([
    (0, common_1.Get)('social/naver/callback'),
    (0, cumuco_nestjs_1.RequestApi)({}),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverLoginCallback", null);
__decorate([
    (0, common_1.Get)('social/apple'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '애플 로그인',
            summary: '애플 로그인',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appleLogin", null);
__decorate([
    (0, common_1.Post)('social/apple/callback'),
    (0, cumuco_nestjs_1.RequestApi)({}),
    (0, cumuco_nestjs_1.ResponseApi)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.AppleLoginCallbackDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "appleLoginCallback", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '토큰 재발급',
            summary: 'accessToken과 refreshToken을 통해 토큰을 재발급합니다.',
        },
        body: {
            type: dto_2.TokenDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '관리자 로그인',
            summary: '관리자 로그인을 합니다.',
        },
        body: {
            type: dto_2.AdminAuthDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.AdminAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('admin/register'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '관리자 회원가입',
            summary: '관리자 회원가입을 합니다.',
        },
        body: {
            type: create_admin_dto_1.CreateAdminDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminRegister", null);
__decorate([
    (0, common_1.Post)('host/login'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '호스트 로그인',
            summary: '호스트 로그인을 합니다.',
        },
        body: {
            type: dto_2.HostAuthDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.HostAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hostLogin", null);
__decorate([
    (0, common_1.Post)('host/register'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '호스트 회원가입',
            summary: '호스트 회원가입을 합니다.',
        },
        body: {
            type: dto_1.CreateHostDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateHostDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hostRegister", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '토큰 리프레시',
            summary: 'access token과 refresh token을 통해 토큰을 재발급합니다.',
        },
        body: {
            type: dto_2.TokenDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_2.TokenDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TokenDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, utils_1.ApiController)('auth', '로그인/회원가입'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cumuco_nestjs_1.KakaoLogin,
        cumuco_nestjs_1.NaverLogin,
        cumuco_nestjs_1.AppleLogin])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map