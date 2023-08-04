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
exports.AdminIconController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const utils_1 = require("../../../utils");
const icon_1 = require("../dto/icon");
const create_icon_dto_1 = require("../dto/icon/create-icon.dto");
const icon_service_1 = require("./icon.service");
let AdminIconController = class AdminIconController {
    constructor(iconService) {
        this.iconService = iconService;
    }
    async getIcon(id) {
        return await this.iconService.findIcon(id);
    }
    async getIcons(paging) {
        return await this.iconService.findPagingIcons(paging);
    }
    async createIcon(file, body) {
        return await this.iconService.createIcon(file, body.name);
    }
    async deleteIcon(id) {
        await this.iconService.deleteIcon(id);
    }
};
__decorate([
    (0, common_1.Get)(':iconId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '아이콘 상세 불러오기',
            summary: '아이콘 상세 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: icon_1.IconDetailDTO,
    }),
    __param(0, (0, common_1.Param)('iconId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminIconController.prototype, "getIcon", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '아이콘 리스트 불러오기',
            summary: '아이콘 리스트 불러오기',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: icon_1.IconDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminIconController.prototype, "getIcons", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icon', {
        fileFilter(req, file, callback) {
            if (!file.originalname.match(/\.(svg)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: { fileSize: 1024 * 1024 * 10 },
    }), utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '아이콘 업로드',
            summary: '아이콘 업로드',
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    icon: {
                        type: 'string',
                        format: 'binary',
                    },
                    name: {
                        type: 'string',
                    },
                },
            },
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_icon_dto_1.CreateIconDTO]),
    __metadata("design:returntype", Promise)
], AdminIconController.prototype, "createIcon", null);
__decorate([
    (0, common_1.Delete)(':iconId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '아이콘 삭제',
            summary: '아이콘 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('iconId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminIconController.prototype, "deleteIcon", null);
AdminIconController = __decorate([
    (0, utils_1.ApiController)('icons', '[관리자] 아이콘'),
    __metadata("design:paramtypes", [icon_service_1.AdminIconService])
], AdminIconController);
exports.AdminIconController = AdminIconController;
//# sourceMappingURL=icon.controller.js.map