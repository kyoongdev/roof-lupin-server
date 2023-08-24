import { Module } from '@nestjs/common';

import { AdminAnnouncementController } from './announcement.controller';
import { AnnouncementRepository } from './announcement.repository';
import { AdminAnnouncementService } from './announcement.service';

@Module({
  providers: [AnnouncementRepository, AdminAnnouncementService],
  controllers: [AdminAnnouncementController],
})
export class AdminAnnouncementModule {}
