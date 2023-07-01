import { Injectable } from '@nestjs/common';

import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';

@Injectable()
export class AdminExhibitionService {
  constructor(private readonly exhibitionRepository: ExhibitionRepository) {}
}
