import { CurationSpaceDTO, CurationSpaceDTOProps } from './curation-space.dto';
export interface CurationDTOProps {
    id: string;
    title: string;
    subTitle: string;
    content: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    orderNo?: number;
    spaces: CurationSpaceDTOProps[];
}
export declare class CurationDTO {
    id: string;
    title: string;
    subTitle: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    spaces: CurationSpaceDTO[];
    orderNo?: number;
    constructor(props: CurationDTOProps);
}
