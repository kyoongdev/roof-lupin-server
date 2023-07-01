import { ApiController } from '@/utils';

import { AdminExhibitionService } from './exhibition.service';

@ApiController('exhibitions', '[관리자] 기획전 관리')
export class AdminExhibitionController {
  constructor(private readonly exhibitionService: AdminExhibitionService) {}
}
