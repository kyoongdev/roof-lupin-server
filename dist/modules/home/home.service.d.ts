import { PrismaService } from '@/database/prisma.service';
import { SpaceRepository } from '../space/space.repository';
import { HomeContentsDTO } from './dto';
export declare class HomeService {
    private readonly database;
    private readonly spaceRepository;
    constructor(database: PrismaService, spaceRepository: SpaceRepository);
    getHomeContents(userId?: string): Promise<HomeContentsDTO[]>;
    findHomeContents(id: string): Promise<import(".prisma/client").Category>;
}
