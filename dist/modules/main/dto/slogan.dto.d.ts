import { Slogan } from '@prisma/client';
export type SloganDTOProps = Slogan;
export declare class SloganDTO {
    id: string;
    content: string;
    isDefault: boolean;
    constructor(props: SloganDTOProps);
}
