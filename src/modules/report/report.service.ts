import { Injectable } from '@nestjs/common';

import { SpaceRepository } from '../space/space.repository';
import { UserRepository } from '../user/user.repository';

import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly spaceRepository: SpaceRepository,
    private readonly userRepository: UserRepository
  ) {}
}
