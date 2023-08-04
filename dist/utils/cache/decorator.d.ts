import { Cache } from 'cache-manager';
import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import { CacheOption } from '@/interface/cache.interface';
export declare const CREATE_CACHE: unique symbol;
export declare const DELETE_CACHE: unique symbol;
export declare const CreateCache: (options: CacheOption) => MethodDecorator;
export declare const DeleteCache: (...key: string[]) => MethodDecorator;
export declare class CreateCacheDecorator implements AOPDecorator {
    private cache;
    constructor(cache: Cache);
    execute({ method, metadata }: AOPParams<any, CacheOption>): (...args: any[]) => Promise<any>;
}
export declare class DeleteCacheDecorator implements AOPDecorator {
    private cache;
    constructor(cache: Cache);
    execute({ method, metadata }: AOPParams<any, string[]>): (...args: any[]) => Promise<any>;
}
