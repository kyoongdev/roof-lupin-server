import { AppInfoService } from './app-info.service';
import { AppInfoDTO, CreateAppInfoDTO, UpdateAppInfoDTO } from './dto';
export declare class AppInfoController {
    private readonly appInfoService;
    constructor(appInfoService: AppInfoService);
    findAppInfos(): Promise<AppInfoDTO[]>;
    createAppInfo(data: CreateAppInfoDTO): Promise<string>;
    updateAppInfo(id: string, body: UpdateAppInfoDTO): Promise<void>;
    deleteAppInfo(id: string): Promise<void>;
}
