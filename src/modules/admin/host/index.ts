import { ApiController } from '@/utils';

import { AdminHostService } from './host.service';

@ApiController('admins/hosts', '호스트 관리')
export class AdminHostController {
  constructor(private readonly hostService: AdminHostService) {}
}
