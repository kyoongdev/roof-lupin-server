import { ApiController } from '@/utils';

import { HostSpaceService } from './space.service';

@ApiController('hosts/spaces', '[호스트] 공간 관리')
export class HostSpaceController {
  constructor(private readonly spaceService: HostSpaceService) {}
}
