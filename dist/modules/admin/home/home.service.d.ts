import { PrismaService } from '@/database/prisma.service';
import { CategoryRepository } from '@/modules/category/category.repository';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from '@/modules/home/dto';
import { RankingRepository } from '@/modules/ranking/ranking.repository';
import { AdminHomeContentDTO } from '../dto/home';
export declare class AdminHomeService {
    private readonly database;
    private readonly categoryRepository;
    private readonly exhibitionRepository;
    private readonly rankingRepository;
    constructor(database: PrismaService, categoryRepository: CategoryRepository, exhibitionRepository: ExhibitionRepository, rankingRepository: RankingRepository);
    findHomeContent(id: string): Promise<import(".prisma/client").HomeContents>;
    findHomeContents(): Promise<AdminHomeContentDTO[]>;
    createHomeContent(data: CreateHomeContentsDTO): Promise<import(".prisma/client").HomeContents>;
    updateHomeContent(id: string, data: UpdateHomeContentsDTO): Promise<void>;
    deleteHomeContent(id: string): Promise<void>;
    validateMutatingHomeContent(data: CreateHomeContentsDTO | UpdateHomeContentsDTO): Promise<void>;
}
