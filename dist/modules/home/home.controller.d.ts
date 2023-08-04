import { RequestUser } from '@/interface/role.interface';
import { CategoryService } from '../category/category.service';
import { CategoryDTO } from '../category/dto';
import { CurationService } from '../curation/curation.service';
import { CurationDTO } from '../curation/dto';
import { HomeContentsDTO } from './dto';
import { HomeService } from './home.service';
export declare class HomeController {
    private readonly homeService;
    private readonly curationService;
    private readonly categoryService;
    constructor(homeService: HomeService, curationService: CurationService, categoryService: CategoryService);
    getHomeContents(user?: RequestUser): Promise<HomeContentsDTO[]>;
    getHomeCuration(): Promise<CurationDTO[]>;
    getHomeCategories(): Promise<CategoryDTO[]>;
}
