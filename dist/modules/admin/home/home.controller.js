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
exports.AdminHomeController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../home/dto");
const utils_1 = require("../../../utils");
const home_1 = require("../dto/home");
const home_service_1 = require("./home.service");
let AdminHomeController = class AdminHomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    async getHomeContents() {
        return await this.homeService.findHomeContents();
    }
    async createHomeContent(body) {
        return await this.homeService.createHomeContent(body);
    }
    async updateHomeContent(id, body) {
        await this.homeService.updateHomeContent(id, body);
    }
    async deleteHomeContent(id) {
        await this.homeService.deleteHomeContent(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 컨텐츠 불러오기',
            summary: '홈 화면 컨텐츠 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: home_1.AdminHomeContentDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminHomeController.prototype, "getHomeContents", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 컨텐츠 생성하기',
            summary: '홈 화면 컨텐츠 생성하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateHomeContentsDTO]),
    __metadata("design:returntype", Promise)
], AdminHomeController.prototype, "createHomeContent", null);
__decorate([
    (0, common_1.Patch)(':homeContentId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 컨텐츠 수정하기',
            summary: '홈 화면 컨텐츠 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('homeContentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateHomeContentsDTO]),
    __metadata("design:returntype", Promise)
], AdminHomeController.prototype, "updateHomeContent", null);
__decorate([
    (0, common_1.Delete)(':homeContentId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '홈 화면 컨텐츠 삭제하기',
            summary: '홈 화면 컨텐츠 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('homeContentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminHomeController.prototype, "deleteHomeContent", null);
AdminHomeController = __decorate([
    (0, utils_1.ApiController)('home', '[관리자] 홈 화면 관리'),
    __metadata("design:paramtypes", [home_service_1.AdminHomeService])
], AdminHomeController);
exports.AdminHomeController = AdminHomeController;
//# sourceMappingURL=home.controller.js.map