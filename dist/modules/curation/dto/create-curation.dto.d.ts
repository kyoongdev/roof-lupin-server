import { CreateCurationSpaceDTO, CreateCurationSpaceDTOProps } from './create-curation-space.dto';
export interface CreateCurationDTOProps {
    title: string;
    subTitle: string;
    content: string;
    thumbnail: string;
    spaces?: CreateCurationSpaceDTOProps[];
}
export declare class CreateCurationDTO {
    title: string;
    subTitle: string;
    content: string;
    thumbnail: string;
    spaces?: CreateCurationSpaceDTO[];
    constructor(props?: CreateCurationDTOProps);
}
