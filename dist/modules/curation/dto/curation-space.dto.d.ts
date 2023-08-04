import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
export interface CurationSpaceDTOProps extends SpaceDTOProps {
    curationOrderNo?: number;
}
export declare class CurationSpaceDTO extends SpaceDTO {
    curationOrderNo?: number;
    constructor(props: CurationSpaceDTOProps);
}
