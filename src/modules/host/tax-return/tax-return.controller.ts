import { ApiController } from '@/utils';

import { HostTaxReturnService } from './tax-return.service';

@ApiController('hosts/tax-returns', '[호스트] 세금신고')
export class HostTaxReturnController {
  constructor(private readonly taxReturnService: HostTaxReturnService) {}
}
