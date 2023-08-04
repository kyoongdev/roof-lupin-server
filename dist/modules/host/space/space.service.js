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
exports.HostSpaceService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const file_service_1 = require("../../file/file.service");
const rental_type_repository_1 = require("../../space/rental-type/rental-type.repository");
const space_repository_1 = require("../../space/space.repository");
const errorCode_1 = require("../exception/errorCode");
const host_exception_1 = require("../exception/host.exception");
let HostSpaceService = class HostSpaceService {
    constructor(spaceRepository, rentalTypeRepository, fileService) {
        this.spaceRepository = spaceRepository;
        this.rentalTypeRepository = rentalTypeRepository;
        this.fileService = fileService;
    }
    async findSpace(id, hostId) {
        const space = await this.spaceRepository.findSpace(id);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_FIND_FORBIDDEN));
        }
        return space;
    }
    async findPagingSpaces(paging, hostId, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.spaceRepository.countSpaces({
            where: {
                hostId,
                ...args.where,
            },
        });
        const spaces = await this.spaceRepository.findSpaces({
            where: {
                hostId,
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(spaces, { paging, count });
    }
    async findSpaces(hostId, args = {}) {
        return await this.spaceRepository.findSpaces({
            where: {
                hostId,
                ...args.where,
            },
        });
    }
    async findSpaceRentalType(spaceId, hostId) {
        const space = await this.spaceRepository.findSpace(spaceId);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_FIND_FORBIDDEN));
        }
        return await this.rentalTypeRepository.findRentalTypes({
            where: {
                spaceId,
            },
        });
    }
    async createSpace(hostId, data) {
        const rentalType = data.rentalTypes;
        const timeCostCount = rentalType.filter((item) => item.rentalType === 1).length;
        if (timeCostCount > 1) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.BAD_REQUEST(errorCode_1.HOST_SPACE_RENTAL_TYPE_BAD_REQUEST));
        }
        return await this.spaceRepository.createSpace(hostId, data);
    }
    async updateRentalType(spaceId, rentalTypeId, hostId, data) {
        const space = await this.spaceRepository.findSpace(spaceId);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_MUTATION_FORBIDDEN));
        }
        const rentalType = await this.rentalTypeRepository.findRentalType(rentalTypeId);
        if (space.id !== rentalType.spaceId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_MUTATION_FORBIDDEN));
        }
        await this.rentalTypeRepository.updateRentalType(rentalTypeId, data);
    }
    async updateSpace(id, hostId, data) {
        const space = await this.spaceRepository.findSpace(id);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_MUTATION_FORBIDDEN));
        }
        if (data.images) {
            await Promise.all(data.images.map(async (image) => {
                await this.fileService.deleteFile(image);
            }));
        }
        await this.spaceRepository.updateSpace(id, data);
    }
    async deleteSpace(id, hostId) {
        const space = await this.spaceRepository.findSpace(id);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_MUTATION_FORBIDDEN));
        }
        if (space.images) {
            await Promise.all(space.images.map(async (image) => {
                await this.fileService.deleteFile(image.url);
            }));
        }
        await this.spaceRepository.deleteSpace(id);
    }
    async hardDeleteSpace(id, hostId) {
        const space = await this.spaceRepository.findSpace(id);
        if (space.host.id !== hostId) {
            throw new host_exception_1.HostException(errorCode_1.HOST_ERROR_CODE.FORBIDDEN(errorCode_1.HOST_SPACE_MUTATION_FORBIDDEN));
        }
        await this.spaceRepository.hardDeleteSpace(id);
    }
};
HostSpaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [space_repository_1.SpaceRepository,
        rental_type_repository_1.RentalTypeRepository,
        file_service_1.FileService])
], HostSpaceService);
exports.HostSpaceService = HostSpaceService;
//# sourceMappingURL=space.service.js.map