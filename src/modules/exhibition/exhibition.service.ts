import { Injectable } from '@nestjs/common';

import { ExhibitionRepository } from './exhibition.repository';

@Injectable()
export class ExhibitionService {
  constructor(private readonly exhibitionRepository: ExhibitionRepository) {}
}
