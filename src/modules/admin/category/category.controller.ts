import { ApiController } from '@/utils';

import { AdminCategoryService } from './category.service';

@ApiController('/categories', '[관리자] 카테고리 관리')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}
}
