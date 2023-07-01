import { ApiController } from '@/utils';

import { ExhibitionService } from './exhibition.service';

@ApiController('exhibitions', '기획전')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}
}
