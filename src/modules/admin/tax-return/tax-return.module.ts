import { Module } from '@nestjs/common';

import { AdminTaxReturnController } from './tax-return.controller';
import { TaxReturnRepository } from './tax-return.repository';
import { AdminTaxReturnService } from './tax-return.service';

@Module({
  controllers: [AdminTaxReturnController],
  providers: [AdminTaxReturnService, TaxReturnRepository],
})
export class AdminTaxReturnModule {}
