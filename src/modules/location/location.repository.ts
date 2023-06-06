import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { LocationDTO } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private readonly database: PrismaService) {}

  async checkLocationByLatLng(lat: string, lng: string) {
    const location = await this.database.location.findUnique({
      where: {
        lat_lng: {
          lat,
          lng,
        },
      },
    });

    return new LocationDTO(location);
  }
}
