import { ApiController } from '@/utils';

import { HomeService } from './home.service';

@ApiController('home', '홈 화면 컨텐츠')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
}
