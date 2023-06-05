import { ApiController } from '@/utils';

import { SearchService } from './search.service';

@ApiController('search', '검색어')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
}
