import { Module } from '@nestjs/common';

import { AppInfoController } from './app-info.controller';
import { AppInfoService } from './app-info.service';

@Module({
  providers: [AppInfoService],
  controllers: [AppInfoController],
})
export class AppInfoModule {}
