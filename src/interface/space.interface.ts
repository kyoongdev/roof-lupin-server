import { PublicTransportation, RentalType, Space, SpaceInterest, SpaceLocation, SpaceReview } from '@prisma/client';

export interface CommonSpace extends Space {
  reviews: SpaceReview[];
  location: SpaceLocation;
  publicTransportations: PublicTransportation[];
  rentalType: RentalType[];
  userInterests: SpaceInterest[];
}

export interface PopularSpace extends Omit<Space, 'averageScore'> {
  averageScore: number;
  userInterests: number;
  reviewCount: number;
  slId: string;
  lat: string;
  lng: string;
  roadAddress: string;
  jibunAddress: string;
  ptName: string;
  ptTimeTaken: number;
}

export interface DistanceSpace extends Omit<Space, 'averageScore'> {
  reviewCount: number;
  slId: string;
  lat: string;
  lng: string;
  roadAddress: string;
  jibunAddress: string;
  distance: string;
  averageScore: number;
  userInterests: number;
  ptName: string;
  ptTimeTaken: number;
}

export interface MaxPossibleTime {
  accTime: number;
  maxPossibleTime: number;
}
