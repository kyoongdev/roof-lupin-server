/// <reference types="node" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/database/prisma.service';
import { S3ImageDTO, UploadedFileDTO } from './dto';
export declare class FileService {
    private readonly database;
    private readonly configService;
    constructor(database: PrismaService, configService: ConfigService);
    toBuffer(arrayBuffer: ArrayBuffer): Buffer;
    deleteAll(): Promise<void>;
    getAllFiles(): Promise<S3ImageDTO[]>;
    getFile(key: string): Promise<import("@aws-sdk/types").SdkStream<import("stream").Readable | ReadableStream | Blob>>;
    uploadFile(file: Express.Multer.File, originKey?: string, contentType?: string): Promise<UploadedFileDTO>;
    uploadBuffer(buffer: Buffer, originKey: string, contentType?: string): Promise<UploadedFileDTO>;
    uploadIcon(file: Express.Multer.File): Promise<UploadedFileDTO>;
    deleteFile(url: string): Promise<void>;
    private imageResize;
    private heicConvert;
    checkInUse(url: string): Promise<boolean>;
}
