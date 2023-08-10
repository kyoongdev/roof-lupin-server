import {
  Category,
  PublicTransportation,
  RentalType,
  Space,
  SpaceCategory,
  SpaceInterest,
  SpaceLocation,
  SpaceReport,
  SpaceReview,
} from '@prisma/client';

export interface SqlSpace {
  id: string;
  title: string;
  description: string;
  buildingType: number;
  thumbnail: string;
  minUser: number;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  minSize: number;
  isImmediateReservation: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isApproved: number;
  isPublic: number;
  orderNo: number | null;
  slId: string;
  lat: string;
  lng: string;
  roadAddress: string;
  jibunAddress: string;
  reviewCount: number;
  averageScore: number | null;
  interestCount: number;
  baseCost: number;
  reportCount: number;
  isInterest: number;
  hostId: string;
}

export interface CommonSpace extends Space {
  reports: SpaceReport[];
  reviews: SpaceReview[];
  location: SpaceLocation;
  publicTransportations: PublicTransportation[];
  rentalType: RentalType[];
  userInterests: SpaceInterest[];
  categories?: (SpaceCategory & {
    category: Category;
  })[];
}

export interface MaxPossibleTime {
  accTime: number;
  maxPossibleTime: number;
}
