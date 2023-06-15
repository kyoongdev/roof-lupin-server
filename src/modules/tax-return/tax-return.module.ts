import { Module } from '@nestjs/common';

import { TaxReturnController } from './tax-return.controller';
import { TaxReturnService } from './tax-return.service';

@Module({
  controllers: [TaxReturnController],
  providers: [TaxReturnService],
})
export class TaxReturnModule {}
