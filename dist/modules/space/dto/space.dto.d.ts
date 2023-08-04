import { RentalType } from '@prisma/client';
import { CommonSpace } from '@/interface/space.interface';
import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';
import { SpaceCategoryDTO, SpaceCategoryDTOProps } from './category';
import { TransportationDTO, type TransportationDTOProps } from './transportaion';
export interface SpaceDTOProps {
    id: string;
    title: string;
    averageScore: number;
    reviewCount: number;
    isInterested?: boolean;
    interestCount: number;
    isImmediateReservation: boolean;
    isPublic: boolean;
    isApproved: boolean;
    thumbnail: string;
    reportCount: number;
    hostId: string;
    publicTransportations?: TransportationDTOProps[];
    location: LocationDTOProps;
    rentalType: RentalType[];
    categories?: SpaceCategoryDTOProps[];
    orderNo: number;
}
export declare class SpaceDTO {
    id: string;
    title: string;
    averageScore: number;
    reviewCount: number;
    reportCount: number;
    timeCost: number | null;
    packageCost: number | null;
    isInterested: boolean;
    isPublic: boolean;
    isApproved: boolean;
    interestCount: number;
    isImmediateReservation: boolean;
    thumbnail: string;
    hostId: string;
    publicTransportations: TransportationDTO[];
    location: LocationDTO | null;
    orderNo?: number;
    categories?: SpaceCategoryDTO[];
    constructor(props: SpaceDTOProps);
    static generateSpaceDTO(space: CommonSpace, userId?: string): SpaceDTOProps;
    static getSpacesIncludeOption(): {
        location: boolean;
        reviews: boolean;
        publicTransportations: boolean;
        userInterests: boolean;
        rentalType: boolean;
        categories: {
            include: {
                category: boolean;
            };
        };
        reports: boolean;
    };
}
