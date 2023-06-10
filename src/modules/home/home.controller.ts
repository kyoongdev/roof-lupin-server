import { ApiController } from '@/utils';

import { HomeService } from './home.service';

@ApiController('home', '로그인 홈 화면 (배경/슬로건)')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
}
