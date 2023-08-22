import { Module } from '@nestjs/common';

import { AnnouncementRepository } from '../admin/announcement/announcement.repository';

import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
  providers: [AnnouncementService, AnnouncementRepository],
  controllers: [AnnouncementController],
})
export class AnnouncementModule {}
