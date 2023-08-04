"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = __importStar(require("@aws-sdk/client-s3"));
const heic_convert_1 = __importDefault(require("heic-convert"));
const sharp_1 = __importDefault(require("sharp"));
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
let FileService = class FileService {
    constructor(database, configService) {
        this.database = database;
        this.configService = configService;
    }
    toBuffer(arrayBuffer) {
        const buffer = Buffer.alloc(arrayBuffer.byteLength);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
            buffer[i] = view[i];
        }
        return buffer;
    }
    async deleteAll() {
        const files = await this.getAllFiles();
        await Promise.all(files.map((file) => this.deleteFile(file.key)));
    }
    async getAllFiles() {
        const files = await new AWS.S3({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
            },
        }).listObjects({
            Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
            Prefix: this.configService.get('NODE_ENV'),
        });
        return files.Contents
            ? await Promise.all(files.Contents.filter((file) => file.Size > 0).map(async (file) => {
                const url = dto_1.ImageDTO.parseS3ImageURL(file.Key);
                const inUse = await this.checkInUse(url);
                return new dto_1.S3ImageDTO({
                    key: file.Key,
                    url,
                    inUse,
                });
            }))
            : [];
    }
    async getFile(key) {
        try {
            const file = await new AWS.S3({
                region: this.configService.get('AWS_REGION'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                    secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
                },
            }).getObject({
                Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
                Key: key,
            });
            return file.Body ? file.Body : null;
        }
        catch (err) {
            return null;
        }
    }
    async uploadFile(file, originKey, contentType = 'image/jpeg') {
        try {
            const originalname = file.originalname.split('.').shift();
            const key = originKey ?? `${Date.now() + `${originalname}.jpeg`}`;
            const resizedFile = await this.imageResize(file.originalname.includes('heic') ? await this.heicConvert(file) : file.buffer);
            await new AWS.S3({
                region: this.configService.get('AWS_REGION'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                    secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
                },
            }).putObject({
                Key: `${this.configService.get('NODE_ENV')}/${key}`,
                Body: resizedFile,
                Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
                ContentType: contentType,
            });
            const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;
            return new dto_1.UploadedFileDTO(url);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
        }
    }
    async uploadBuffer(buffer, originKey, contentType = 'image/jpeg') {
        try {
            const key = originKey;
            await new AWS.S3({
                region: this.configService.get('AWS_REGION'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                    secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
                },
            }).putObject({
                Key: `${this.configService.get('NODE_ENV')}/${key}`,
                Body: buffer,
                Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
                ContentType: contentType,
            });
            const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;
            return new dto_1.UploadedFileDTO(url);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
        }
    }
    async uploadIcon(file) {
        try {
            const originalname = file.originalname.split('.').shift();
            const key = `${Date.now() + `${originalname}.svg`}`;
            await new AWS.S3({
                region: this.configService.get('AWS_REGION'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                    secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
                },
            }).putObject({
                Key: `${this.configService.get('NODE_ENV')}/${key}`,
                Body: file.buffer,
                Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
                ContentType: 'image/svg+xml',
            });
            const url = `${this.configService.get('AWS_CLOUD_FRONT_URL')}/${key}`;
            return new dto_1.UploadedFileDTO(url);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('이미지 저장 중 오류가 발생했습니다.');
        }
    }
    async deleteFile(url) {
        try {
            await new AWS.S3({
                region: this.configService.get('AWS_REGION'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                    secretAccessKey: this.configService.get('AWS_S3_PRIVATE_KEY'),
                },
            }).deleteObject({
                Key: dto_1.ImageDTO.parseS3ImageKey(url),
                Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('이미지 삭제 중 오류가 발생했습니다.');
        }
    }
    async imageResize(file) {
        const transformer = await (0, sharp_1.default)(file)
            .resize({ width: 780, height: 564, fit: sharp_1.default.fit.cover })
            .jpeg({ mozjpeg: true })
            .toBuffer();
        return transformer;
    }
    async heicConvert(file) {
        const transformer = await (0, heic_convert_1.default)({
            buffer: file.buffer,
            format: 'JPEG',
            quality: 1,
        });
        return this.toBuffer(transformer);
    }
    async checkInUse(url) {
        const image = await this.database.image.findFirst({
            where: {
                url,
            },
        });
        const icon = await this.database.icon.findFirst({
            where: {
                url,
            },
        });
        const building = await this.database.building.findFirst({
            where: {
                iconPath: url,
            },
        });
        const service = await this.database.service.findFirst({
            where: {
                iconPath: url,
            },
        });
        const category = await this.database.category.findFirst({
            where: {
                iconPath: url,
            },
        });
        const exhibition = await this.database.exhibition.findFirst({
            where: {
                OR: [
                    {
                        thumbnail: url,
                    },
                    {
                        content: {
                            contains: url,
                        },
                    },
                ],
            },
        });
        const curation = await this.database.curation.findFirst({
            where: {
                OR: [
                    { thumbnail: url },
                    {
                        content: {
                            contains: url,
                        },
                    },
                ],
            },
        });
        const mainImage = await this.database.mainImage.findFirst({
            where: {
                url,
            },
        });
        const space = await this.database.space.findFirst({
            where: { thumbnail: url },
        });
        const host = await this.database.host.findFirst({
            where: {
                profileImage: url,
            },
        });
        const user = await this.database.user.findFirst({
            where: {
                profileImage: url,
            },
        });
        return (Boolean(user) ||
            Boolean(host) ||
            Boolean(space) ||
            Boolean(mainImage) ||
            Boolean(exhibition) ||
            Boolean(curation) ||
            Boolean(category) ||
            Boolean(service) ||
            Boolean(building) ||
            Boolean(icon) ||
            Boolean(image));
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map