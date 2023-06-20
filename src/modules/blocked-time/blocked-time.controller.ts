import { ApiController } from '@/utils';

import { BlockedTimeService } from './blocked-time.service';

@ApiController('blocked-times', '[호스트] 시간 차단')
export class BlockedTimeController {
  constructor(private readonly blockedTimeService: BlockedTimeService) {}
}
