import { Get } from '@nestjs/common';

import { ClientRevalidateEvent } from '@/event/client';
import { ApiController } from '@/utils';
@ApiController('spaces', '공간')
export class SpaceController {
  constructor(private readonly clientEmitter: ClientRevalidateEvent) {}
  @Get()
  getSpaces(): string {
    this.clientEmitter.revalidateClient();
    return 'getSpaces';
  }
}
