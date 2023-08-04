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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const main_service_1 = require("./main.service");
let MainController = class MainController {
    constructor(mainService) {
        this.mainService = mainService;
    }
    async getMain() {
        return await this.mainService.findMain();
    }
    async getPagingMainImages(paging) {
        return this.mainService.findPagingMainImages(paging);
    }
    async getMainImages() {
        return this.mainService.findMainImages();
    }
    async createMainImage(body) {
        return this.mainService.createMainImage(body);
    }
    async updateMainImage(id, body) {
        return this.mainService.updateMainImage(id, body);
    }
    async deleteMainImage(id) {
        return this.mainService.deleteMainImage(id);
    }
    async getPagingSlogans(paging) {
        return this.mainService.findPagingSlogans(paging);
    }
    async getSlogans() {
        return this.mainService.findSlogans();
    }
    async createSlogan(body) {
        return this.mainService.createSlogan(body);
    }
    async updateSlogan(id, body) {
        return this.mainService.updateSlogan(id, body);
    }
    async deleteSlogan(id) {
        return this.mainService.deleteSlogan(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 (배경/슬로건) 조회',
            summary: '로그인 홈 화면 (배경/슬로건) 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.MainDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getMain", null);
__decorate([
    (0, common_1.Get)('images/paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 배경 이미지 페이징 조회 ',
            summary: '로그인 홈 화면 배경 이미지 페이징 조회 - 관리자만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.MainDTO }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getPagingMainImages", null);
__decorate([
    (0, common_1.Get)('images/list'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 배경 이미지 리스트 조회 ',
            summary: '로그인 홈 화면 배경 이미지 리스트 조회 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.MainDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getMainImages", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 배경 이미지 생성',
            summary: '로그인 홈 화면 배경 이미지 생성 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateMainImageDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMainImageDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "createMainImage", null);
__decorate([
    (0, common_1.Patch)('images/:mainImageId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 배경 이미지 수정',
            summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'mainImageId',
            type: 'string',
            required: true,
            description: '홈 이미지 id',
        },
        body: {
            type: dto_1.UpdateMainImageDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('mainImageId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateMainImageDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "updateMainImage", null);
__decorate([
    (0, common_1.Delete)('images/:mainImageId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 배경 이미지 수정',
            summary: '로그인 홈 화면 배경 이미지 수정 - 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'mainImageId',
            type: 'string',
            required: true,
            description: '홈 이미지 id',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('mainImageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "deleteMainImage", null);
__decorate([
    (0, common_1.Get)('slogans/paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 슬로건 페이징 조회 ',
            summary: '로그인 홈 화면 슬로건 페이징 조회 - 관리자만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.MainDTO }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getPagingSlogans", null);
__decorate([
    (0, common_1.Get)('slogans/list'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 슬로건 리스트 조회 ',
            summary: '로그인 홈 화면 슬로건 리스트 조회 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({ type: dto_1.MainDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getSlogans", null);
__decorate([
    (0, common_1.Post)('slogans'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 슬로건 생성',
            summary: '로그인 홈 화면 슬로건 생성 - 관리자만 사용 가능합니다.',
        },
        body: {
            type: dto_1.CreateSloganDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSloganDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "createSlogan", null);
__decorate([
    (0, common_1.Patch)('slogans/:sloganId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 슬로건 수정',
            summary: '로그인 홈 화면 슬로건 수정 - 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'sloganId',
            type: 'string',
            required: true,
            description: '슬로건 id',
        },
        body: {
            type: dto_1.UpdateSloganDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('sloganId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSloganDTO]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "updateSlogan", null);
__decorate([
    (0, common_1.Delete)('slogans/:sloganId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '로그인 홈 화면 슬로건 수정',
            summary: '로그인 홈 화면 슬로건 수정 - 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'sloganId',
            type: 'string',
            required: true,
            description: '슬로건 id',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('sloganId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "deleteSlogan", null);
MainController = __decorate([
    (0, utils_1.ApiController)('main', '로그인 화면 (배경/슬로건)'),
    __metadata("design:paramtypes", [main_service_1.MainService])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map