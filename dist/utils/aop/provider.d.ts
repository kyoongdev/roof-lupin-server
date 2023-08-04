import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
export declare class AOPProvider implements OnModuleInit {
    private readonly discovery;
    private readonly scanner;
    private readonly reflect;
    constructor(discovery: DiscoveryService, scanner: MetadataScanner, reflect: Reflector);
    onModuleInit(): void;
    getInstance(): void;
    getAopDecorators(providers: InstanceWrapper<any>[]): any[];
}
