import {
  Category,
  CategoryIcon,
  Icon,
  PublicTransportation,
  RefundPolicy,
  RentalType,
  Space,
  SpaceCategory,
  SpaceInterest,
  SpaceLocation,
  SpaceReview,
  UserReport,
} from '@prisma/client';

export interface SqlSpace {
  id: string;
  title: string;
  description: string;
  buildingType: number;
  thumbnail: string;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  minSize: number;
  isImmediateReservation: number;
  isRoofOnly: number;
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
  detailAddress: string;
  reviewCount: number;
  averageScore: number | null;
  interestCount: number;
  baseCost: number;
  reportCount: number;
  isInterest: number;
  hostId: string;
}

export interface SQLCategory extends Category {
  iconId: string;
  iconUrl: string;
  iconName: string;
}

export interface CommonSpace extends Space {
  reviews: SpaceReview[];
  location: SpaceLocation;
  publicTransportations: PublicTransportation[];
  rentalType: RentalType[];
  userInterests: SpaceInterest[];
  refundPolicies: RefundPolicy[];
  categories?: (SpaceCategory & {
    category: Category & {
      icons: (CategoryIcon & {
        icon: Icon;
      })[];
    };
  })[];
  reports: UserReport[];
}

export interface MaxPossibleTime {
  accTime: number;
  maxPossibleTime: number;
}
