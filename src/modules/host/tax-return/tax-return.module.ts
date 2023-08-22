import { Module } from '@nestjs/common';

import { TaxReturnRepository } from '@/modules/admin/tax-return/tax-return.repository';

import { HostTaxReturnController } from './tax-return.controller';
import { HostTaxReturnService } from './tax-return.service';

@Module({
  providers: [HostTaxReturnService, TaxReturnRepository],
  controllers: [HostTaxReturnController],
})
export class HostTaxReturnModule {}
