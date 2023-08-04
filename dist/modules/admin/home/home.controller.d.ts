import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from '@/modules/home/dto';
import { AdminHomeContentDTO } from '../dto/home';
import { AdminHomeService } from './home.service';
export declare class AdminHomeController {
    private readonly homeService;
    constructor(homeService: AdminHomeService);
    getHomeContents(): Promise<AdminHomeContentDTO[]>;
    createHomeContent(body: CreateHomeContentsDTO): Promise<import(".prisma/client").HomeContents>;
    updateHomeContent(id: string, body: UpdateHomeContentsDTO): Promise<void>;
    deleteHomeContent(id: string): Promise<void>;
}
