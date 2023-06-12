import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { LocationDTO } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private readonly database: PrismaService) {}

  async getLocationsByDistance(userLat: string, userLng: string) {
    const locations = await this.database.$queryRaw`
    SELECT *,
	(6371*acos(cos(radians(${userLat}))*cos(radians(lat))*cos(radians(lng)
	-radians(${userLng}))+sin(radians(${userLat}))*sin(radians(lat))))
	AS distance
  FROM SpaceLocation
  HAVING distance <= 10
  ORDER BY distance 
  LIMIT 0,20
`;
    console.log({ locations });
  }
}
