import { SpaceService } from '@prisma/client';

import { ApiController } from '@/utils';

@ApiController('hosts/spaces', '[호스트] 공간 관리')
export class HostSpaceController {
  constructor(private readonly spaceService: SpaceService) {}
}
