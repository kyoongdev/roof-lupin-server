import { Controller, Get } from '@nestjs/common';

@Controller('space')
export class SpaceController {
  @Get()
  getSpaces(): string {
    return 'getSpaces';
  }
}
