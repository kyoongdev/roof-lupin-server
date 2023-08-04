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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const file_service_1 = require("./file.service");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async deleteAll() {
        await this.fileService.deleteAll();
    }
    async getAll() {
        return await this.fileService.getAllFiles();
    }
    async uploadImage(file) {
        return this.fileService.uploadFile(file);
    }
    async uploadImages(files) {
        const images = await Promise.all(files.map(async (file) => await this.fileService.uploadFile(file)));
        return images;
    }
    async deleteImage(body) {
        await this.fileService.deleteFile(body.url);
    }
};
__decorate([
    (0, common_1.Delete)('/all'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '모든 파일 삭제',
            summary: '모든 S3 파일 삭제 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '모든 파일 불러오기',
            summary: '모든 S3 파일 불러오기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        fileFilter(req, file, callback) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: { fileSize: 1024 * 1024 * 10 },
    })),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '이미지 업로드',
            summary: '이미지 업로드',
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    image: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
    }, 201),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('/images'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', undefined, {
        fileFilter(req, file, callback) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: { fileSize: 1024 * 1024 * 10 },
    })),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '이미지 업로드',
            summary: '이미지 업로드',
        },
        body: {
            schema: {
                type: 'object',
                properties: {
                    images: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UploadedFileDTO,
        isArray: true,
    }, 201),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '이미지 삭제',
            summary: '이미지 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteFileDTO]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteImage", null);
FileController = __decorate([
    (0, utils_1.ApiController)('file', '파일'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map