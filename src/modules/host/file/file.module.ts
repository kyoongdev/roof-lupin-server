import { Module } from '@nestjs/common';

import { FileService } from '@/modules/file/file.service';

import { HostFileController } from './file.controller';

@Module({
  providers: [FileService],
  controllers: [HostFileController],
})
export class HostFileModule {}
