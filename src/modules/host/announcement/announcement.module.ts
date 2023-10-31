import { Module } from '@nestjs/common';

import { AnnouncementRepository } from '@/modules/admin/announcement/announcement.repository';

import { HostAnnouncementController } from './announcement.controller';
import { HostAnnouncementService } from './announcement.service';

@Module({
  providers: [HostAnnouncementService, AnnouncementRepository],
  controllers: [HostAnnouncementController],
})
export class HostAnnouncementModule {}
