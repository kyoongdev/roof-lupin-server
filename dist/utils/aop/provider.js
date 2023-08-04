"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPProvider = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const aop_decorator_1 = require("./aop.decorator");
const utils_1 = require("./utils");
let AOPProvider = class AOPProvider {
    constructor(discovery, scanner, reflect) {
        this.discovery = discovery;
        this.scanner = scanner;
        this.reflect = reflect;
    }
    onModuleInit() {
        this.getInstance();
    }
    getInstance() {
        const providers = this.discovery.getProviders();
        const controllers = this.discovery.getControllers();
        const singletonInstances = providers
            .concat(controllers)
            .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
            .filter((wrapper) => wrapper.isDependencyTreeStatic());
        const aopDecorators = this.getAopDecorators(providers);
        singletonInstances.forEach(({ instance }) => {
            const methodNames = this.scanner.getAllMethodNames(instance);
            methodNames
                .filter((methodName) => Boolean(instance[methodName]))
                .filter((methodName) => instance[methodName].name.includes(utils_1.AOPPrefix))
                .forEach((methodName) => {
                aopDecorators.forEach((aopInstance) => {
                    const metadataKey = this.reflect.get(aop_decorator_1.AOP_KEY, aopInstance.constructor);
                    const metadataList = this.reflect.get(metadataKey, instance[methodName]);
                    if (!metadataList) {
                        return;
                    }
                    for (const { originalFn, metadata, aopSymbol } of metadataList) {
                        const wrappedMethod = aopInstance.execute({
                            instance,
                            methodName,
                            method: originalFn.bind(instance),
                            metadata,
                        });
                        Object.setPrototypeOf(wrappedMethod, instance[methodName]);
                        instance[aopSymbol] ??= {};
                        instance[aopSymbol][methodName] = wrappedMethod;
                    }
                });
            });
        });
    }
    getAopDecorators(providers) {
        return providers
            .filter((wrapper) => wrapper.isDependencyTreeStatic())
            .filter(({ instance, metatype }) => {
            if (!instance || !metatype) {
                return false;
            }
            const aspect = this.reflect.get(aop_decorator_1.AOP_KEY, metatype);
            if (!aspect) {
                return false;
            }
            return typeof instance.execute === 'function';
        })
            .map(({ instance }) => instance);
    }
};
AOPProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner,
        core_1.Reflector])
], AOPProvider);
exports.AOPProvider = AOPProvider;
//# sourceMappingURL=provider.js.map