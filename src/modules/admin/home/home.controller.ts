import { ApiController } from '@/utils';

import { AdminHomeService } from './home.service';

@ApiController('home', '[관리자] 홈 화면 관리')
export class AdminHomeController {
  constructor(private readonly homeService: AdminHomeService) {}
}
