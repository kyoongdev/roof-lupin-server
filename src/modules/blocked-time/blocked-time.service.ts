import { Injectable } from '@nestjs/common';

import { BlockedTimeRepository } from './blocked-time.repository';

@Injectable()
export class BlockedTimeService {
  constructor(private readonly blockedTimeRepository: BlockedTimeRepository) {}
}
