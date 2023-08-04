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
exports.AdminIconService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const file_service_1 = require("../../file/file.service");
const admin_exception_1 = require("../exception/admin.exception");
const errorCode_1 = require("../exception/errorCode");
const icon_repository_1 = require("./icon.repository");
let AdminIconService = class AdminIconService {
    constructor(iconRepository, fileService) {
        this.iconRepository = iconRepository;
        this.fileService = fileService;
    }
    async findIcon(id) {
        return await this.iconRepository.findIcon(id);
    }
    async findPagingIcons(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.iconRepository.countIcons({ where: args.where });
        const icons = await this.iconRepository.findIcons({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(icons, { count, paging });
    }
    async createIcon(file, name) {
        const { url } = await this.fileService.uploadIcon(file);
        return await this.iconRepository.createIcon(url, { name });
    }
    async deleteIcon(id) {
        const icon = await this.findIcon(id);
        const result = await this.iconRepository.checkIconInUse(icon.url);
        if (result.inUse) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.CONFLICT(errorCode_1.ADMIN_ICON_IN_USE));
        }
        await this.fileService.deleteFile(icon.url);
        return await this.iconRepository.deleteIcon(id);
    }
};
AdminIconService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [icon_repository_1.IconRepository, file_service_1.FileService])
], AdminIconService);
exports.AdminIconService = AdminIconService;
//# sourceMappingURL=icon.service.js.map