import { Auth } from 'wemacu-nestjs';

import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostQnAService } from './qna.service';

@ApiController('hosts/qnas', '[호스트] QnA 관리')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostQnAController {
  constructor(private readonly qnaService: HostQnAService) {}
}
