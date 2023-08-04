import { UpdateCurationSpaceDTO, UpdateCurationSpaceDTOProps } from './update-curation-space.dto';
export interface UpdateCurationDTOProps {
    title?: string;
    subTitle?: string;
    content?: string;
    thumbnail?: string;
    spaces?: UpdateCurationSpaceDTOProps[];
}
export declare class UpdateCurationDTO {
    title?: string;
    subTitle?: string;
    content?: string;
    thumbnail?: string;
    spaces?: UpdateCurationSpaceDTO[];
    constructor(props?: UpdateCurationDTOProps);
}
