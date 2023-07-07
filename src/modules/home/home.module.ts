import { Module } from '@nestjs/common';

import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';
import { CurationRepository } from '../curation/curation.repository';
import { CurationService } from '../curation/curation.service';
import { ExhibitionRepository } from '../exhibition/exhibition.repository';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { SpaceRepository } from '../space/space.repository';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [
    HomeService,
    SpaceRepository,
    RentalTypeRepository,
    CurationService,
    CurationRepository,
    CategoryService,
    CategoryRepository,
    ExhibitionRepository,
  ],
})
export class HomeModule {}
