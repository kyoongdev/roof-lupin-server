import { Module } from '@nestjs/common';

import { TaxReturnController } from './tax-return.controller';
import { TaxReturnRepository } from './tax-return.repository';
import { TaxReturnService } from './tax-return.service';

@Module({
  controllers: [TaxReturnController],
  providers: [TaxReturnService, TaxReturnRepository],
})
export class TaxReturnModule {}
