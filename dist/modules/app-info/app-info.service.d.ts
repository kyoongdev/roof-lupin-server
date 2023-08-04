import { PrismaService } from '@/database/prisma.service';
import { AppInfoDTO, CreateAppInfoDTO, UpdateAppInfoDTO } from './dto';
export declare class AppInfoService {
    private readonly database;
    constructor(database: PrismaService);
    findAppInfoById(id: string): Promise<AppInfoDTO>;
    findAppInfos(): Promise<AppInfoDTO[]>;
    createAppInfo(data: CreateAppInfoDTO): Promise<string>;
    updateAppInfo(id: string, data: UpdateAppInfoDTO): Promise<void>;
    deleteAppInfo(id: string): Promise<void>;
}
