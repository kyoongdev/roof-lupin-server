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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const space_repository_1 = require("../space/space.repository");
const dto_2 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const home_exception_1 = require("./exception/home.exception");
let HomeService = class HomeService {
    constructor(database, spaceRepository) {
        this.database = database;
        this.spaceRepository = spaceRepository;
    }
    async getHomeContents(userId) {
        const contents = await this.database.homeContents.findMany({
            include: {
                contentsCategory: {
                    include: {
                        spaces: {
                            include: {
                                space: {
                                    include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                                },
                            },
                            orderBy: {
                                orderNo: 'asc',
                            },
                        },
                    },
                },
                exhibition: {
                    include: {
                        spaces: {
                            include: {
                                space: {
                                    include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                                },
                            },
                            orderBy: {
                                orderNo: 'asc',
                            },
                        },
                    },
                },
                ranking: {
                    include: {
                        spaces: {
                            include: {
                                space: {
                                    include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                                },
                            },
                            orderBy: {
                                orderNo: 'asc',
                            },
                            skip: 0,
                            take: 3,
                        },
                    },
                },
            },
            orderBy: {
                orderNo: 'asc',
            },
        });
        return contents.map((content) => new dto_2.HomeContentsDTO({
            ...content,
            ...(content.contentsCategory && {
                contentsCategory: {
                    ...content.contentsCategory,
                    spaces: content.contentsCategory.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space, userId)),
                },
            }),
            ...(content.ranking && {
                ranking: {
                    ...content.ranking,
                    spaces: content.ranking.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space, userId)),
                },
            }),
            ...(content.exhibition && {
                exhibition: content.exhibition,
            }),
        }));
    }
    async findHomeContents(id) {
        const category = await this.database.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new home_exception_1.HomeException(errorCode_1.HOME_ERROR_CODE.NOT_FOUND(errorCode_1.HOME_CONTENTS_NOT_FOUND));
        }
        return category;
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, space_repository_1.SpaceRepository])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map