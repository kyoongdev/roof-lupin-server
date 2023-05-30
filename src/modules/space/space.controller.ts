import { Get } from '@nestjs/common';

import { ApiController } from '@/utils';
@ApiController('spaces', '공간')
export class SpaceController {
  @Get()
  getSpaces(): string {
    return 'getSpaces';
  }
}
