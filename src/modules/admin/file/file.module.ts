import { Module } from '@nestjs/common';

import { FileService } from '@/modules/file/file.service';

import { AdminFileController } from './file.controller';

@Module({
  providers: [FileService],
  controllers: [AdminFileController],
})
export class AdminFileModule {}
