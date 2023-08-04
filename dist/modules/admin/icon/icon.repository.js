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
exports.IconRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const icon_1 = require("../dto/icon");
const admin_exception_1 = require("../exception/admin.exception");
const errorCode_1 = require("../exception/errorCode");
let IconRepository = class IconRepository {
    constructor(database) {
        this.database = database;
    }
    async checkIconInUse(iconPath) {
        const building = await this.database.building.findFirst({
            where: {
                iconPath,
            },
        });
        const service = await this.database.service.findFirst({
            where: {
                iconPath,
            },
        });
        const category = await this.database.category.findFirst({
            where: {
                iconPath,
            },
        });
        return new icon_1.IconInUseDTO({ inUse: !!building || !!service || !!category });
    }
    async findIcon(id) {
        const icon = await this.database.icon.findUnique({
            where: {
                id,
            },
        });
        if (!icon) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.NOT_FOUND(errorCode_1.ADMIN_ICON_NOT_FOUND));
        }
        return new icon_1.IconDetailDTO({
            ...icon,
            inUse: (await this.checkIconInUse(icon.url)).inUse,
        });
    }
    async countIcons(args = {}) {
        return await this.database.icon.count(args);
    }
    async findIcons(args = {}) {
        const icons = await this.database.icon.findMany(args);
        return icons.map((icon) => new icon_1.IconDTO(icon));
    }
    async createIcon(url, data) {
        const icon = await this.database.icon.create({
            data: {
                url,
                name: data.name,
            },
        });
        return icon.id;
    }
    async deleteIcon(id) {
        await this.database.icon.delete({
            where: {
                id,
            },
        });
    }
};
IconRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IconRepository);
exports.IconRepository = IconRepository;
//# sourceMappingURL=icon.repository.js.map